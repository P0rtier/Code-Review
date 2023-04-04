package com.kpz.codereview.user.account.service.impl;

import com.kpz.codereview.user.account.model.Account;
import com.kpz.codereview.user.account.repository.AccountRepository;
import com.kpz.codereview.user.account.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository repo;

    @Override
    public List<Account> getAll() {
        return repo.findAll();
    }
}
