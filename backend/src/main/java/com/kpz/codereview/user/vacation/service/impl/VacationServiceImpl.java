package com.kpz.codereview.user.vacation.service.impl;

import com.kpz.codereview.exception.model.EntityNotFoundException;
import com.kpz.codereview.user.account.service.AccountService;
import com.kpz.codereview.user.vacation.dto.VacationDTO;
import com.kpz.codereview.user.vacation.model.Vacation;
import com.kpz.codereview.user.vacation.service.VacationService;
import com.kpz.codereview.user.vacation.repository.VacationRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class VacationServiceImpl implements VacationService {

    private final static String EMAIL_VALIDATION_ERROR_MSG = "No such account in DB";
    private final static String DATE_OVERLAP_ERROR_MSG = "Vacation in that range already exists";

    @Autowired
    private VacationRepository repo;

    @Autowired
    private AccountService accountService;

    @Override
    public List<VacationDTO> getAll() {
        return repo.findAll().stream()
                .map(vacation ->
                    VacationDTO.builder()
                        .email(vacation.getEmail())
                        .startDate(vacation.getStartDate())
                        .endDate(vacation.getEndDate())
                        .build()).toList();
    }

    @Override
    public void addVacation(VacationDTO vacationDTO) {
        if(!accountService.existsByEmail(vacationDTO.getEmail())){
            throw new EntityNotFoundException(EMAIL_VALIDATION_ERROR_MSG);
        }

        if(!vacationOverlapValidation(vacationDTO.getEmail(), vacationDTO.getStartDate(), vacationDTO.getEndDate())){
            throw new IllegalArgumentException(DATE_OVERLAP_ERROR_MSG);
        }

        repo.save(
                Vacation.builder()
                        .email(vacationDTO.getEmail())
                        .startDate(vacationDTO.getStartDate())
                        .endDate(vacationDTO.getEndDate())
                        .build()
        );
    }

    @Override
    @Transactional
    public void addAllVacations(List<VacationDTO> vacationDTOS) {
        vacationDTOS.forEach(this::addVacation);
    }

    @Override
    public void deleteVacation(@NotNull Long vacationId) {
        repo.deleteById(vacationId);
    }

    @Override
    public void deleteAllVacationsById(@NotNull List<Long> vacationIdList){
        repo.deleteAllById(vacationIdList);
    }

    @Override
    public boolean vacationOverlapValidation(String email, LocalDate startDate, LocalDate endDate) {
        return repo.findAllByEmail(email).stream()
                .noneMatch(vacation -> !(startDate.isAfter(vacation.getEndDate()) || endDate.isBefore(vacation.getStartDate())));
    }
}
