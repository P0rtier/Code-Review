package com.kpz.codereview.azureclient.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Project {
    public String id;
    public String name;
    public String state;
}
