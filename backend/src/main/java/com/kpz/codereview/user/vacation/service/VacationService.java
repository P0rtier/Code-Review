package com.kpz.codereview.user.vacation.service;

import com.kpz.codereview.user.vacation.dto.VacationDTO;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public interface VacationService {
    List<VacationDTO> getAll();
    void addVacation(VacationDTO vacationDTO);
    void addAllVacations(List<VacationDTO> vacationDTOS);
    void deleteVacation(Long vacationId );
    void deleteAllVacationsById(@NotNull List<Long> vacationIdList);
    boolean vacationOverlapValidation(String email, LocalDate startDate, LocalDate endDate);
}
