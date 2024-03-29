package com.kpz.codereview.azureclient.model.azure.component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SystemCreatedBy {
    public String displayName;
    public String uniqueName;
}
