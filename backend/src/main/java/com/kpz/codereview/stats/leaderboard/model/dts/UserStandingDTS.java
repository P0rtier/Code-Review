package com.kpz.codereview.stats.leaderboard.model.dts;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserStandingDTS {
    private int id;
    private String userEmail;
    private String displayName;
    private int score;
    private int place;
    private List<String> teams;
}
