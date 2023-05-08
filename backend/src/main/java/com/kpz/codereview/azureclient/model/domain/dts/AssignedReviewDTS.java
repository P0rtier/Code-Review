package com.kpz.codereview.azureclient.model.domain.dts;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class AssignedReviewDTS {
    Integer id;
    String title;
    Date createdDate;
    String link;
    String project;
    String scheduledByName;
    String scheduledByEmail;
    List<String> tags;
}
