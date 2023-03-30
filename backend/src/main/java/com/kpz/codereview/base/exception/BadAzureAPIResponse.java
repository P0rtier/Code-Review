package com.kpz.codereview.base.exception;

public class BadAzureAPIResponse extends RuntimeException {
    public BadAzureAPIResponse() {
        super("Bad api response received!");
    }

    public BadAzureAPIResponse(String message) {
        super(message);
    }

    public BadAzureAPIResponse(Exception e) {
        super(e);
    }
}