package com.kpz.codereview.azureclient.model.wrapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kpz.codereview.azureclient.model.component.WorkItemShort;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class WorkItemSearchQuery {

    @JsonProperty("workItems")
    public List<WorkItemShort> workItems;
}
