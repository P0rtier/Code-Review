package com.kpz.codereview.azureclient.model.base.wrapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserWrapper {
    public String mailAddress;
}
