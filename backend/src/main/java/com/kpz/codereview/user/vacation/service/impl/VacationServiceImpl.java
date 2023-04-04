package com.kpz.codereview.user.vacation.service.impl;

import com.kpz.codereview.user.vacation.service.VacationService;
import com.kpz.codereview.user.vacation.model.Vacation;
import com.kpz.codereview.user.vacation.repository.VacationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VacationServiceImpl implements VacationService {

    @Autowired
    private VacationRepository repo;

    @Override
    public List<Vacation> getAll() {
        return repo.findAll();
    }
}
