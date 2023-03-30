package com.kpz.codereview.client.model.component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SystemAssignedTo {
    public String displayName;
    public String uniqueName;
}
