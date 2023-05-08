package com.kpz.codereview.azureclient.model.base.component;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CodeReviewerStatDTS {

    private String displayName;
    private String uniqueName;
    private ReviewStats reviewStats;
}
