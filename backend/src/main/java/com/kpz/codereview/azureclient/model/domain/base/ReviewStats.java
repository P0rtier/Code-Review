package com.kpz.codereview.azureclient.model.domain.base;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewStats {
    private Integer done;
    private Integer active;
    private long avgReviewHours;
}
