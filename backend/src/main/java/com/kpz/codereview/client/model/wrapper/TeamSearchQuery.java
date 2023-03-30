package com.kpz.codereview.client.model.wrapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kpz.codereview.client.model.Team;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TeamSearchQuery {
    public int count;

    @JsonProperty("value")
    public List<Team> projects;
}
