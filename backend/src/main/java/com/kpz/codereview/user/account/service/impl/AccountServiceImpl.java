package com.kpz.codereview.user.account.service.impl;

import com.kpz.codereview.user.account.model.Account;
import com.kpz.codereview.user.account.repository.AccountRepository;
import com.kpz.codereview.user.account.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository repo;

    @Override
    public List<Account> getAll() {
        return repo.findAll();
    }

    @Override
    public Account getByEmail(String email) {
        return repo.findByEmail(email)
                .orElseThrow(NoSuchElementException::new);
    }

    @Override
    public boolean existsByEmail(String email) {
        return repo.existsByEmail(email);
    }

    @Override
    public Optional<Account> findById(UUID id) {
        return repo.findById(id);
    }
}
