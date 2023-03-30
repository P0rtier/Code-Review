package com.kpz.codereview.base.exception;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResponseErrorHandler;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Component
public class RestTemplateResponseErrorHandler implements ResponseErrorHandler {

    @Override
    public boolean hasError(ClientHttpResponse response) throws IOException {
        return response.getStatusCode().isError();
    }

    @Override
    public void handleError(ClientHttpResponse response) throws IOException {
        HttpStatusCode code = response.getStatusCode();
        if (code.is4xxClientError() || code.is5xxServerError()) {
            var bodyStream = response.getBody();

            StringBuilder builder = new StringBuilder();

            try (BufferedReader reader = new BufferedReader(new InputStreamReader(bodyStream))) {
                reader.lines().forEach(builder::append);
            }

            String errorMsg = builder.toString();
            throw new BadAzureAPIResponse(errorMsg);
        }
    }
}
