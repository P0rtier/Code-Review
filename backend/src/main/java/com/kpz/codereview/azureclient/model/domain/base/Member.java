package com.kpz.codereview.azureclient.model.domain.base;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Member {
    @Builder.Default
    public List<String> teams = new ArrayList<>();
    public String displayName;
    public String id;
    public String uniqueName;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Member member = (Member) o;
        return Objects.equals(displayName, member.displayName) && Objects.equals(uniqueName, member.uniqueName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(displayName, uniqueName);
    }
}