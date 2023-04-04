package com.kpz.codereview.user.vacation.controller;

import com.kpz.codereview.user.vacation.model.Vacation;
import com.kpz.codereview.user.vacation.service.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user/vacation")
public class VacationsController {

    @Autowired
    private VacationService service;

    @GetMapping("/all")
    public List<Vacation> getAll(){
        return service.getAll();
    }
}
