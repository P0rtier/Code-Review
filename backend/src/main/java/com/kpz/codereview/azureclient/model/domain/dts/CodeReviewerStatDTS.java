package com.kpz.codereview.azureclient.model.domain.dts;

import com.kpz.codereview.azureclient.model.domain.base.ReviewStats;
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
