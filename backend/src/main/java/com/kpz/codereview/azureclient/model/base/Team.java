package com.kpz.codereview.azureclient.model.base;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Team {
    public String id;
    public String name;
    public String description;
}
