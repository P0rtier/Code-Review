package com.kpz.codereview.exception.model;

public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException() {
        super("Given entity not found");
    }

    public EntityNotFoundException(String message) {
        super(message);
    }
}
