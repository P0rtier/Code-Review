package com.kpz.codereview.user.vacation.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Objects;


@Data
@NoArgsConstructor
@Entity
@Table(name="vacations")
public class Vacation {
    @Id
    private String email;
    private LocalDate startDate;
    private LocalDate endDate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vacation vacation = (Vacation) o;
        return Objects.equals(email, vacation.email) && Objects.equals(startDate, vacation.startDate) && Objects.equals(endDate, vacation.endDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, startDate, endDate);
    }
}
