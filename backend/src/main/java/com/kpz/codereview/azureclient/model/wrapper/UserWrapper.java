package com.kpz.codereview.azureclient.model.wrapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kpz.codereview.azureclient.model.Member;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserWrapper {
    public String mailAddress;
}
