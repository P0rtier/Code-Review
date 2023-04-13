package com.kpz.codereview.exception.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kpz.codereview.exception.model.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component("delegatedAuthentificationEntryPoint")
public class DelegatedAuthEntryPoint implements AuthenticationEntryPoint {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static final String BAD_AUTHENTICATION_EXCEPTION_TYPE = "/errors/auth/bad-request";
    private static final String BAD_AUTHENTICATION_TITLE = """
            Authorization token is either invalid or not present!
            """;

    private static final String NOT_FOUND_EXCEPTION_TYPE = "/errors/not-found";
    private static final String NOT_FOUND_TITLE = "Requested resource does not exist!";


    private static final String UNKNOWN_EXCEPTION_TYPE = "/errors/unknown";
    private static final String UNKNOWN_TITLE = "Unexpected error occurred!";


    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException ex) throws IOException {

        var responseStatus = response.getStatus();
        String timeStamp;
        HttpStatus status;
        String detail;
        String instance;

        switch (responseStatus) {
            case 200 -> {
                timeStamp = LocalDateTime.now().format(DATE_TIME_FORMATTER);
                status = HttpStatus.UNAUTHORIZED;
                detail = ex.getMessage();
                instance = request.getRequestURI();
            }

            case 404 -> {
                timeStamp = LocalDateTime.now().format(DATE_TIME_FORMATTER);
                status = HttpStatus.NOT_FOUND;
                detail = "Requested resource does not exist, consider checking request's path";
                instance = request.getRequestURI();
            }

            default -> {
                timeStamp = LocalDateTime.now().format(DATE_TIME_FORMATTER);
                status = HttpStatus.INTERNAL_SERVER_ERROR;
                detail = ex.getMessage();
                instance = request.getRequestURI();
            }
        }

        var error = ErrorResponse.builder()
                .timestamp(timeStamp)
                .type(BAD_AUTHENTICATION_EXCEPTION_TYPE)
                .title(BAD_AUTHENTICATION_TITLE)
                .status(status.value())
                .detail(detail)
                .instance(instance)
                .build();


        response.setStatus(status.value());
        response.setContentType("application/json ");

        var responseStream = response.getOutputStream();
        new ObjectMapper().writeValue(responseStream, error);
    }
}
