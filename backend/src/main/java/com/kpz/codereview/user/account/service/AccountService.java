package com.kpz.codereview.user.account.service;

import com.kpz.codereview.user.account.model.Account;

import java.util.List;
import java.util.Optional;

public interface AccountService {
    List<Account> getAll();
    Account getByEmail(String email);
}
