package com.kpz.codereview.exception.model;

public class BadRequestBodyException extends RuntimeException {
    public BadRequestBodyException() {
        super("Bad request body provided!");
    }

    public BadRequestBodyException(String message) {
        super(message);
    }
}