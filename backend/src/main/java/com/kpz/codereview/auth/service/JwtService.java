package com.kpz.codereview.auth.service;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;


@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${auth.refresh.token.ttl.days}")
    private int REFRESH_TOKEN_DAYS_TTL;

    @Value("${auth.access.token.ttl.minutes}")
    private int ACCESS_TOKEN_MINUTES_TTL;

    private static final String ACCESS_TOKEN_PREFIX = "Access";
    private static final String REFRESH_TOKEN_PREFIX = "Refresh";

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;


    public String generateAccessToken(UserDetails user) {
        JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                .expiresAt(Instant.now().plus(ACCESS_TOKEN_MINUTES_TTL, ChronoUnit.MINUTES))
                .subject(ACCESS_TOKEN_PREFIX + user.getUsername())
                .build();

        var parameters = JwtEncoderParameters.from(jwtClaimsSet);

        return jwtEncoder.encode(parameters).getTokenValue();
    }

    public String generateRefreshToken(UserDetails user) {
        JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                .expiresAt(Instant.now().plus(REFRESH_TOKEN_DAYS_TTL, ChronoUnit.DAYS))
                .subject(REFRESH_TOKEN_PREFIX + user.getUsername())
                .build();

        var parameters = JwtEncoderParameters.from(jwtClaimsSet);
        var token = jwtEncoder.encode(parameters).getTokenValue();
        System.out.println(token);

        return token;
    }

    public boolean isTokenInvalid(String token) {
        try {
            jwtDecoder.decode(token).getSubject();
            jwtDecoder.decode(token).getExpiresAt();

            return false;

        } catch (Exception ignored) {
        }

        return true;
    }

    public boolean isTokenExpired(String token) {
        return jwtDecoder.decode(token)
                .getExpiresAt()
                .isBefore(Instant.now());

    }

    String getSubject(String token) {
        return jwtDecoder.decode(token).getSubject();
    }
}
