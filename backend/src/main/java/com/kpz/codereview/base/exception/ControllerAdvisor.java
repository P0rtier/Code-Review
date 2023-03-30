package com.kpz.codereview.base.exception;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kpz.codereview.base.model.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ControllerAdvice
public class ControllerAdvisor {

    private static final String BAD_REQUEST_BODY_EXCEPTION_TYPE = "/errors/general/bad-request-body";
    private static final String BAD_REQUEST_BODY_EXCEPTION_TITLE = "Request body is invalid";
    private static final String JSON_PROCESSING_EXCEPTION_TYPE = "/errors/azure/bad-body";
    private static final String JSON_PROCESSING_EXCEPTION_TITLE = "Response body from azure API cannot be deserialized";
    private static final String BAD_AZURE_RESPONSE_EXCEPTION_TYPE="/errors/azure/bad-request";
    private static final String BAD_AZURE_RESPONSE_EXCEPTION_TITLE="Azure API returned error response";
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");


    @ExceptionHandler(BadRequestBodyException.class)
    private ResponseEntity<ErrorResponse> handleUserNotFoundException(
            BadRequestBodyException ex, ServletWebRequest request) {

        var timeStamp = LocalDateTime.now().format(DATE_TIME_FORMATTER);
        var status = HttpStatus.BAD_REQUEST;
        var detail = ex.getMessage();
        var instance = request.getRequest().getRequestURI();

        var error =  ErrorResponse.builder()
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

        var error =  ErrorResponse.builder()
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

        var error =  ErrorResponse.builder()
                .timestamp(timeStamp)
                .type(BAD_AZURE_RESPONSE_EXCEPTION_TYPE)
                .title(BAD_AZURE_RESPONSE_EXCEPTION_TITLE)
                .status(status.value())
                .detail(detail)
                .instance(instance)
                .build();

        return new ResponseEntity<>(error, status);
    }
}
