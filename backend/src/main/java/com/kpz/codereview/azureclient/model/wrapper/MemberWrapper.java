package com.kpz.codereview.azureclient.model.wrapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kpz.codereview.azureclient.model.Member;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MemberWrapper {
    private Member identity;
    private boolean isTeamAdmin;
}
