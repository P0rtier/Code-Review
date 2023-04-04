package com.kpz.codereview.user.account.repository;

import com.kpz.codereview.user.account.model.Account;
import org.springframework.data.repository.ListCrudRepository;

public interface AccountRepository extends ListCrudRepository<Account, Long> {
}
