package com.kpz.codereview.auth.controller;


import com.kpz.codereview.auth.model.AuthHeaders;
import com.kpz.codereview.auth.model.AuthRequest;
import com.kpz.codereview.auth.service.AuthService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.AuthenticationException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService service;

    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "400",
                    description = "Request is invalid",
                    content = @Content
            ),
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @PostMapping("/register")
    public AuthHeaders register(@RequestBody AuthRequest request) throws NoSuchAlgorithmException, InvalidKeySpecException, AuthenticationException {
        return service.register(request);
    }

    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "400",
                    description = "Request is invalid",
                    content = @Content
            ),
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @PostMapping("/authenticate")
    public AuthHeaders authenticate(@RequestBody AuthRequest request) throws NoSuchAlgorithmException, InvalidKeySpecException, AuthenticationException {
        return service.authenticate(request);
    }

    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "400",
                    description = "Request is invalid",
                    content = @Content
            ),
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @PostMapping("/refresh-access")
    public AuthHeaders refreshAccess(@RequestBody AuthHeaders request) throws AuthenticationException {
        return service.refreshAccess(request.getRefreshToken());
    }
}
