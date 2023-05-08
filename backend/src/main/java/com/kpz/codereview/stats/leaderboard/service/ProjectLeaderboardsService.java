package com.kpz.codereview.stats.leaderboard.service;

import com.kpz.codereview.stats.leaderboard.model.base.ProjectLeaderboard;
import com.kpz.codereview.stats.leaderboard.model.base.TeamMapping;
import com.kpz.codereview.stats.leaderboard.model.base.UserStanding;
import com.kpz.codereview.stats.leaderboard.model.dts.ProjectLeaderboardDTS;

import java.util.List;
import java.util.Set;


public interface ProjectLeaderboardsService {
    ProjectLeaderboardDTS getTeamLeaderboard(String projectId);

    void deleteAll();


    void saveLeaderboard(ProjectLeaderboard projectLeaderboard, List<UserStanding> userStandings, Set<TeamMapping> teamMappings);
}
