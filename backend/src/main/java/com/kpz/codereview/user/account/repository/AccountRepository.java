package com.kpz.codereview.user.account.repository;

import com.kpz.codereview.user.account.model.Account;
import org.springframework.data.repository.ListCrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface AccountRepository extends ListCrudRepository<Account, UUID> {
    Optional<Account> findByEmail(String email);

    Optional<Account> findByRefreshToken(String refreshToken);
}
