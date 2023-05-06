package com.kpz.codereview.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kpz.codereview.auth.model.AuthHeaders;
import com.kpz.codereview.auth.model.AuthRequest;
import com.kpz.codereview.azureclient.service.AzureClientService;
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

    private final static String ENCRYPTION_ALGORITHM = "PBKDF2WithHmacSHA1";
    private final static String NO_EMAIL_EXCEPTION_MESSAGE = "Provide email in the request!";
    private final static String INVALID_EMAIL_EXCEPTION_MESSAGE = "Email is invalid!";
    private final static String INVALID_PASSWORD_EXCEPTION_MESSAGE = """
    Password is not at least 8 characters long, has no big letter, no small letter or number or special character!
    """;
    private final static String USER_ALREADY_REGISTERED_EXCEPTION_MESSAGE = "User is already registered!";
    private final static String INVALID_CREDENTIALS_EXCEPTION_MESSAGE = "User credentials are invalid!";
    private final static String INVALID_ACCESS_TOKEN_EXCEPTION_MESSAGE = "Provided access token is invalid!";
    private final static String INVALID_REFRESH_TOKEN_EXCEPTION_MESSAGE = "Provided refresh token is invalid!";
    private final static String EXPIRED_TOKEN_EXCEPTION_MESSAGE = "Provided token is expired!";
    private final static String NO_ACCOUNT_EXCEPTION_MESSAGE = "Owner of this token no longer exists!";
    private final static String NO_AZURE_ACCOUNT_EXCEPTION_MESSAGE = """
    User does not have an account in Azure Devops organization!
    """;
    private final static String EMAIL_REGEX = "^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$";
    private final static String PASSWORD_REGEX = "^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@!#$%&? \"]).*$";
    private final AccountRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final AzureClientService azureClientService;

    public AuthHeaders register(AuthRequest request) throws NoSuchAlgorithmException, InvalidKeySpecException, AuthenticationException, JsonProcessingException {
        var email = request.getEmail();
        var rawPassword = request.getPassword();

        if (email == null) {
            throw new AuthenticationException(NO_EMAIL_EXCEPTION_MESSAGE);
        }

        if (!email.matches(EMAIL_REGEX)) {
            throw new AuthenticationException(INVALID_EMAIL_EXCEPTION_MESSAGE);
        }

        if(!rawPassword.matches(PASSWORD_REGEX)) {
            throw new AuthenticationException(INVALID_PASSWORD_EXCEPTION_MESSAGE);
        }

        var allUsers = azureClientService.getAllUsersFromOrg();
        var userExists = allUsers.stream()
                .anyMatch(user -> user.equals(email));

        if (!userExists) {
            throw new AuthenticationException(NO_AZURE_ACCOUNT_EXCEPTION_MESSAGE);
        }


        if (repository.findByEmail(email).isPresent()) {
            throw new AuthenticationException(USER_ALREADY_REGISTERED_EXCEPTION_MESSAGE);
        }

        var salt = generateSalt();
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

    public AuthHeaders login(AuthRequest request) throws NoSuchAlgorithmException, InvalidKeySpecException, AuthenticationException {

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthenticationException(INVALID_CREDENTIALS_EXCEPTION_MESSAGE));

        var rawPassword = request.getPassword();
        var userSalt = user.getSalt();
        var requestPasswordHash = hashPassword(userSalt, rawPassword);

        if (!requestPasswordHash.equals(user.getPasswordHash())) {
            throw new AuthenticationException(INVALID_CREDENTIALS_EXCEPTION_MESSAGE);
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

    public AuthHeaders refreshAccess(String refreshToken, String accessToken) throws AuthenticationException {
        if (jwtService.isTokenInvalid(refreshToken)) {
            throw new AuthenticationException(INVALID_REFRESH_TOKEN_EXCEPTION_MESSAGE);
        }

        if (jwtService.isTokenInvalid(accessToken)) {
            throw new AuthenticationException(INVALID_ACCESS_TOKEN_EXCEPTION_MESSAGE);
        }

        var user = repository.findByRefreshToken(refreshToken);

        if (user.isEmpty()) {
            throw new AuthenticationException(NO_ACCOUNT_EXCEPTION_MESSAGE);
        }

        if (jwtService.isTokenExpired(refreshToken)) {
            throw new AuthenticationException(EXPIRED_TOKEN_EXCEPTION_MESSAGE);
        }

        var newAccessToken = jwtService.generateAccessToken(user.get());

        return AuthHeaders.builder()
                .accessToken(newAccessToken)
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
        SecretKeyFactory factory = SecretKeyFactory.getInstance(ENCRYPTION_ALGORITHM);

        return Arrays.toString(factory.generateSecret(spec).getEncoded());
    }
}