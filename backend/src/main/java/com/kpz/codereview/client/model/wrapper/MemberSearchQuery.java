package com.kpz.codereview.client.model.wrapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kpz.codereview.client.model.Member;
import com.kpz.codereview.client.model.Project;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MemberSearchQuery {
    public int count;

    @JsonProperty("value")
    public List<MemberWrapper> members;
}
