package com.kpz.codereview.user.vacation.service.impl;

import com.kpz.codereview.user.vacation.service.VacationService;
import com.kpz.codereview.user.vacation.model.Vacation;
import com.kpz.codereview.user.vacation.repository.VacationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class VacationServiceImpl implements VacationService {

    @Autowired
    private VacationRepository repo;

    @Override
    public List<Vacation> getAll() {
        return repo.findAll();
    }

    @Override
    public boolean userAvailability(String email, LocalDate startDate, LocalDate endDate) {
        return repo.findAllByEmail(email).stream()
                .noneMatch(vacation -> !(startDate.isAfter(vacation.getEndDate()) || endDate.isBefore(vacation.getStartDate())));
    }
}
