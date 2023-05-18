package com.kpz.codereview.user.account.service;

import com.kpz.codereview.user.account.model.Account;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AccountService {
    List<Account> getAll();
    Account getByEmail(String email);

    boolean existsByEmail(String email);

    Optional<Account> findById(UUID id);
    boolean existsByEmail(String email);
}
