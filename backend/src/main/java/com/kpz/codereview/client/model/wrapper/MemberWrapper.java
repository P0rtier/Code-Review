package com.kpz.codereview.client.model.wrapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kpz.codereview.client.model.Member;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MemberWrapper {
    private Member identity;
    private boolean isTeamAdmin;
}
