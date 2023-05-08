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
public class ProjectLeaderboardDTS {
    private String projectId;
    private String projectName;
    private List<UserStandingDTS> userStandings;
}
