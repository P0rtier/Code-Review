package com.kpz.codereview.exception.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kpz.codereview.exception.model.BadAzureAPIResponse;
import com.kpz.codereview.exception.model.BadRequestBodyException;
import com.kpz.codereview.exception.model.EntityNotFoundException;
import com.kpz.codereview.exception.model.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.naming.AuthenticationException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ControllerAdvice
public class ControllerAdvisor extends ResponseEntityExceptionHandler {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private static final String BAD_REQUEST_BODY_EXCEPTION_TYPE = "/errors/general/bad-request-body";
    private static final String BAD_REQUEST_BODY_EXCEPTION_TITLE = "Request body is invalid";

    private static final String JSON_PROCESSING_EXCEPTION_TYPE = "/errors/azure/bad-body";
    private static final String JSON_PROCESSING_EXCEPTION_TITLE = "Response body from azure API cannot be deserialized";

    private static final String BAD_AUTHENTICATION_EXCEPTION_TYPE = "/errors/auth/bad-request";
    private static final String BAD_AUTHENTICATION_TITLE = "Failed to authenticate user";

    private static final String BAD_AZURE_RESPONSE_EXCEPTION_TYPE = "/errors/azure/bad-request";
    private static final String BAD_AZURE_RESPONSE_EXCEPTION_TITLE = "Azure API returned error response";

    private static final String ENTITY_NOT_FOUND_EXCEPTION_TYPE = "/errors/general/not-found";
    private static final String ENTITY_NOT_FOUND_EXCEPTION_TITLE = "Entity does not exist";



    @ExceptionHandler(BadRequestBodyException.class)
    private ResponseEntity<ErrorResponse> handleUserNotFoundException(
            BadRequestBodyException ex, ServletWebRequest request) {

        var timeStamp = LocalDateTime.now().format(DATE_TIME_FORMATTER);
        var status = HttpStatus.BAD_REQUEST;
        var detail = ex.getMessage();
        var instance = request.getRequest().getRequestURI();

        var error = ErrorResponse.builder()
                .timestamp(timeStamp)
                .type(BAD_REQUEST_BODY_EXCEPTION_TYPE)
                .title(BAD_REQUEST_BODY_EXCEPTION_TITLE)
                .status(status.value())
                .detail(detail)
                .instance(instance)
                .build();

        return new ResponseEntity<>(error, status);
    }

    @ExceptionHandler(JsonProcessingException.class)
    private ResponseEntity<ErrorResponse> handleJsonProcessingException(
            BadRequestBodyException ex, ServletWebRequest request) {

        var timeStamp = LocalDateTime.now().format(DATE_TIME_FORMATTER);
        var status = HttpStatus.INTERNAL_SERVER_ERROR;
        var detail = ex.getMessage();
        var instance = request.getRequest().getRequestURI();

        var error = ErrorResponse.builder()
                .timestamp(timeStamp)
                .type(JSON_PROCESSING_EXCEPTION_TYPE)
                .title(JSON_PROCESSING_EXCEPTION_TITLE)
                .status(status.value())
                .detail(detail)
                .instance(instance)
                .build();

        return new ResponseEntity<>(error, status);
    }

    @ExceptionHandler(BadAzureAPIResponse.class)
    private ResponseEntity<ErrorResponse> handleBadAzureAPIResponse(
            BadAzureAPIResponse ex, ServletWebRequest request) {

        var timeStamp = LocalDateTime.now().format(DATE_TIME_FORMATTER);
        var status = HttpStatus.GONE;
        var detail = ex.getMessage();
        var instance = request.getRequest().getRequestURI();

        var error = ErrorResponse.builder()
                .timestamp(timeStamp)
                .type(BAD_AZURE_RESPONSE_EXCEPTION_TYPE)
                .title(BAD_AZURE_RESPONSE_EXCEPTION_TITLE)
                .status(status.value())
                .detail(detail)
                .instance(instance)
                .build();

        return new ResponseEntity<>(error, status);
    }

    @ExceptionHandler(AuthenticationException.class)
    private ResponseEntity<ErrorResponse> handleAuthenticationException(
            AuthenticationException ex, ServletWebRequest request) {

        var timeStamp = LocalDateTime.now().format(DATE_TIME_FORMATTER);
        var status = HttpStatus.BAD_REQUEST;
        var detail = ex.getMessage();
        var instance = request.getRequest().getRequestURI();

        var error = ErrorResponse.builder()
                .timestamp(timeStamp)
                .type(BAD_AUTHENTICATION_EXCEPTION_TYPE)
                .title(BAD_AUTHENTICATION_TITLE)
                .status(status.value())
                .detail(detail)
                .instance(instance)
                .build();

        return new ResponseEntity<>(error, status);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    private ResponseEntity<ErrorResponse> handleEntityNotFoundException(
            EntityNotFoundException ex, ServletWebRequest request) {

        var timeStamp = LocalDateTime.now().format(DATE_TIME_FORMATTER);
        var status = HttpStatus.NOT_FOUND;
        var detail = ex.getMessage();
        var instance = request.getRequest().getRequestURI();

        var error = ErrorResponse.builder()
                .timestamp(timeStamp)
                .type(ENTITY_NOT_FOUND_EXCEPTION_TYPE)
                .title(ENTITY_NOT_FOUND_EXCEPTION_TITLE)
                .status(status.value())
                .detail(detail)
                .instance(instance)
                .build();

        return new ResponseEntity<>(error, status);
    }
}
