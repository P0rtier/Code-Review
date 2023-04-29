package com.kpz.codereview.azureclient.model.base.component;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AvailabilityPeriod {
    LocalDate startDate;
    LocalDate endDate;
}
