package com.kpz.codereview.azureclient.model.domain;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProjectSummary {
    private String name;
    private List<AssignedReview> assignedReviews;
    private List<UnassignedReview> unassignedReviews;
}
