package com.kpz.codereview.user.vacation.repository;

import com.kpz.codereview.user.vacation.model.Vacation;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface VacationRepository extends ListCrudRepository<Vacation, Long> {
    List<Vacation> findAllByEmail(String email);
}
