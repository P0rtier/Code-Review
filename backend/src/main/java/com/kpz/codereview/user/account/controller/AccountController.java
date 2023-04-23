package com.kpz.codereview.user.account.controller;

import com.kpz.codereview.user.account.model.Account;
import com.kpz.codereview.user.account.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/all")
    public List<Account> getAll(){
        return accountService.getAll();
    }
}
