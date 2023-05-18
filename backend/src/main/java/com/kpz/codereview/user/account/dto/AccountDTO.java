package com.kpz.codereview.user.account.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
    private UUID id;
    private String email;
    private String passwordHash;
    private byte[] salt;
}
