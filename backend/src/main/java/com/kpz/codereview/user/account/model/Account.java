package com.kpz.codereview.user.account.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.Objects;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name="accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String email;
    private String passwordHash;
    private byte[] salt;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return Objects.equals(id, account.id) && Objects.equals(email, account.email) && Objects.equals(passwordHash, account.passwordHash) && Arrays.equals(salt, account.salt);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, email, passwordHash);
        result = 31 * result + Arrays.hashCode(salt);
        return result;
    }
}
