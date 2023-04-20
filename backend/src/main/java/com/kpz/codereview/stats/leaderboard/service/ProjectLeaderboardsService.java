package com.kpz.codereview.stats.leaderboard.service;

import com.kpz.codereview.stats.leaderboard.model.ProjectLeaderboard;
import com.kpz.codereview.stats.leaderboard.model.UserStanding;

import java.util.List;


public interface ProjectLeaderboardsService {
    ProjectLeaderboard getTeamLeaderboard(String projectId);

    void deleteAll();

    void saveLeaderboard(ProjectLeaderboard projectLeaderboard, List<UserStanding> userStanding);
}
