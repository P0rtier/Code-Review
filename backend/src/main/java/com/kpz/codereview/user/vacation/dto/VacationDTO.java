package com.kpz.codereview.user.vacation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VacationDTO {
    private String email;
    private LocalDate startDate;
    private LocalDate endDate;
}
