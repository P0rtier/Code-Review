package com.kpz.codereview.azureclient.model.wrapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AllUsersSearchQuery {
    public int count;

    @JsonProperty("value")
    public List<UserWrapper> users;
}
