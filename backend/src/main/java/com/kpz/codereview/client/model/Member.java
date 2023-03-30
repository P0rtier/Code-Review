package com.kpz.codereview.client.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Member {
    public String displayName;
    public String id;
    public String uniqueName;
}