package com.kpz.codereview.azureclient.model.base.component;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CodeReviewerDTS {
    String displayName;
    String uniqueName;
    List<String> teamNames;
    int activeReviews;
    boolean availability;
}
