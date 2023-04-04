package com.kpz.codereview.azureclient.model.component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class WorkItemShort {
    public int id;
}
