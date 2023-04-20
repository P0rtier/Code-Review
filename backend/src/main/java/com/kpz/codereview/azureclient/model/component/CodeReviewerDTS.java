package com.kpz.codereview.azureclient.model.component;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CodeReviewerDTS {
    String displayName;
    String uniqueName;
    String teamName;
    int activeReviews;
    boolean availability;
}
