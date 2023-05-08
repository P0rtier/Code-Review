package com.kpz.codereview.azureclient.model.azure.wrapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kpz.codereview.azureclient.model.azure.component.Fields;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class WorkItem {
    public int id;
    public int rev;
    public Fields fields;
}
