package com.kpz.codereview.base.exception;

public class BadRequestBodyException extends RuntimeException {
    public BadRequestBodyException() {
        super("Bad request body provided!");
    }

    public BadRequestBodyException(String message) {
        super(message);
    }
}