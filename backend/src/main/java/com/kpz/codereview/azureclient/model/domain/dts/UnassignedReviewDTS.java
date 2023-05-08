package com.kpz.codereview.azureclient.model.domain.dts;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class UnassignedReviewDTS {
    Integer id;
    String title;
    Date createdDate;
    List<String> tags;
    String link;
    String project;
}
