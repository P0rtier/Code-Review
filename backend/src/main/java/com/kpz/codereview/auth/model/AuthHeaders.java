package com.kpz.codereview.auth.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthHeaders {
    String refreshToken;
    String accessToken;
}
