package com.kpz.codereview.user.vacation.service;

import com.kpz.codereview.user.vacation.model.Vacation;

import java.time.LocalDate;
import java.util.List;

public interface VacationService {
    List<Vacation> getAll();
    boolean userAvailability(String email, LocalDate startDate, LocalDate endDate);
}
