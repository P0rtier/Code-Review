package com.kpz.codereview.auth.service;

import com.kpz.codereview.auth.model.AuthHeaders;
import com.kpz.codereview.auth.model.AuthRequest;
import com.kpz.codereview.user.account.model.Account;
import com.kpz.codereview.user.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.naming.AuthenticationException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AccountRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public AuthHeaders register(AuthRequest request) throws NoSuchAlgorithmException, InvalidKeySpecException, AuthenticationException {
        var email = request.getEmail();

        if (repository.findByEmail(email).isPresent()) {
            throw new AuthenticationException("User is already registered");
        }

        var salt = generateSalt();
        var rawPassword = request.getPassword();
        var hashedPassword = hashPassword(salt, rawPassword);

        var newAccount = Account.builder()
                .email(request.getEmail())
                .passwordHash(hashedPassword)
                .salt(salt)
                .build();

        var savedAccount = repository.save(newAccount);
        var refreshToken = jwtService.generateRefreshToken(savedAccount);

        savedAccount.setRefreshToken(refreshToken);
        repository.save(savedAccount);

        var accessToken = jwtService.generateAccessToken(savedAccount);

        return AuthHeaders.builder()
                .refreshToken(refreshToken)
                .accessToken(accessToken)
                .build();
    }

    public AuthHeaders authenticate(AuthRequest request) throws NoSuchAlgorithmException, InvalidKeySpecException, AuthenticationException {

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthenticationException("User credentials are invalid"));

        var rawPassword = request.getPassword();
        var userSalt = user.getSalt();
        var requestPasswordHash = hashPassword(userSalt, rawPassword);

        if (!requestPasswordHash.equals(user.getPasswordHash())) {
            throw new AuthenticationException("User credentials are invalid");
        }

        var refreshToken = jwtService.generateRefreshToken(user);
        user.setRefreshToken(refreshToken);
        repository.save(user);

        var accessToken = jwtService.generateAccessToken(user);

        return AuthHeaders.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthHeaders refreshAccess(String refreshToken) throws AuthenticationException {
        if (jwtService.isTokenInvalid(refreshToken)) {
            throw new AuthenticationException("Provided token is invalid!");
        }

        var user = repository.findByRefreshToken(refreshToken);

        if (user.isEmpty()) {
            throw new AuthenticationException("Owner of this token no longer exists!");
        }

        if (jwtService.isTokenExpired(refreshToken)) {
            throw new AuthenticationException("Provided token is expired!");
        }

        var accessToken = jwtService.generateAccessToken(user.get());

        return AuthHeaders.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }


    private byte[] generateSalt() {
        var random = new SecureRandom();
        var salt = new byte[8];

        random.nextBytes(salt);

        return salt;
    }

    private String hashPassword(byte[] salt, String rawPassword) throws NoSuchAlgorithmException, InvalidKeySpecException {
        KeySpec spec = new PBEKeySpec(rawPassword.toCharArray(), salt, 65536, 128);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");

        return Arrays.toString(factory.generateSecret(spec).getEncoded());
    }
}