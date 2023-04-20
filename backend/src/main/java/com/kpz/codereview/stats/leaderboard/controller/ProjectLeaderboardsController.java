package com.kpz.codereview.stats.leaderboard.controller;

import com.kpz.codereview.stats.leaderboard.model.ProjectLeaderboard;
import com.kpz.codereview.stats.leaderboard.service.ProjectLeaderboardsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/leaderboards")
public class ProjectLeaderboardsController {
    private final ProjectLeaderboardsService leaderboardsService;

    @GetMapping("/{projectId}")
    ProjectLeaderboard getTeamLeaderboard(@PathVariable String projectId) {
        return leaderboardsService.getTeamLeaderboard(projectId);
    }
}
