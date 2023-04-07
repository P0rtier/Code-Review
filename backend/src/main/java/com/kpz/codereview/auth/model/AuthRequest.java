package com.kpz.codereview.auth.model;

import lombok.Data;

@Data
public class AuthRequest {
    String email;
    String password;
}
