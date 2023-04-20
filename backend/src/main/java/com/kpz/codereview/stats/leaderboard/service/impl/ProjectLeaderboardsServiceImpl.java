package com.kpz.codereview.stats.leaderboard.service.impl;

import com.kpz.codereview.exception.model.EntityNotFoundException;
import com.kpz.codereview.stats.leaderboard.model.ProjectLeaderboard;
import com.kpz.codereview.stats.leaderboard.model.UserStanding;
import com.kpz.codereview.stats.leaderboard.repository.ProjectLeaderboardsRepository;
import com.kpz.codereview.stats.leaderboard.repository.UserStandingsRepository;
import com.kpz.codereview.stats.leaderboard.service.ProjectLeaderboardsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class ProjectLeaderboardsServiceImpl implements ProjectLeaderboardsService {
    private final ProjectLeaderboardsRepository projectLeaderboardsRepository;
    private final UserStandingsRepository userStandingsRepository;

    @Override
    public ProjectLeaderboard getTeamLeaderboard(String projectId) {
        return projectLeaderboardsRepository.findById(projectId)
                .orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public void deleteAll() {
        userStandingsRepository.deleteAll();
        projectLeaderboardsRepository.deleteAll();
    }

    @Override
    public void saveLeaderboard(ProjectLeaderboard projectLeaderboard, List<UserStanding> userStanding) {
        userStandingsRepository.saveAll(userStanding);
        projectLeaderboardsRepository.save(projectLeaderboard);
    }
}
