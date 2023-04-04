package com.kpz.codereview.user.account.dto;

import java.util.UUID;

public class AccountDTO {
    private UUID id;
    private String email;
    private String passwordHash;
    private byte[] salt;
}
