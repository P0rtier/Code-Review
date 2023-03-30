package com.kpz.codereview.client.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kpz.codereview.client.model.component.Fields;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class WorkItem {
    public int id;
    public int rev;
    public Fields fields;
}
