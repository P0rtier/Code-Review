package com.kpz.codereview.azureclient.model.domain.dts;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProjectSummaryDTS {
    private String name;
    private List<AssignedReviewDTS> assignedReviews;
    private List<UnassignedReviewDTS> unassignedReviews;
}
