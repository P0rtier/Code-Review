package com.kpz.codereview.stats.leaderboard.service.impl;

import com.kpz.codereview.exception.model.EntityNotFoundException;
import com.kpz.codereview.stats.leaderboard.model.base.ProjectLeaderboard;
import com.kpz.codereview.stats.leaderboard.model.base.TeamMapping;
import com.kpz.codereview.stats.leaderboard.model.base.UserStanding;
import com.kpz.codereview.stats.leaderboard.model.dts.ProjectLeaderboardDTS;
import com.kpz.codereview.stats.leaderboard.model.dts.UserStandingDTS;
import com.kpz.codereview.stats.leaderboard.repository.ProjectLeaderboardsRepository;
import com.kpz.codereview.stats.leaderboard.repository.TeamsRepository;
import com.kpz.codereview.stats.leaderboard.repository.UserStandingsRepository;
import com.kpz.codereview.stats.leaderboard.repository.UsersRepository;
import com.kpz.codereview.stats.leaderboard.service.ProjectLeaderboardsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


@RequiredArgsConstructor
@Service
public class ProjectLeaderboardsServiceImpl implements ProjectLeaderboardsService {
    private final ProjectLeaderboardsRepository projectLeaderboardsRepository;
    private final UserStandingsRepository userStandingsRepository;
    private final TeamsRepository teamsRepository;
    private final UsersRepository usersRepository;

    @Override
    public ProjectLeaderboardDTS getTeamLeaderboard(String projectId) {
        var leaderboard =  projectLeaderboardsRepository.findById(projectId)
                .orElseThrow(EntityNotFoundException::new);

        var userStandings = leaderboard.getUserStandings().stream()
                .map(standing -> {
                    var teams = standing.getUser()
                            .getTeams()
                            .stream()
                            .map(TeamMapping::getTeamName)
                            .toList();

                    return UserStandingDTS.builder()
                            .id(standing.getId())
                            .displayName(standing.getUser().getDisplayName())
                            .userEmail(standing.getUser().getUserEmail())
                            .score(standing.getScore())
                            .place(standing.getPlace())
                            .teams(teams)
                            .build();
                })
                .toList();

        return ProjectLeaderboardDTS.builder()
                .projectName(leaderboard.getProjectName())
                .projectId(leaderboard.getProjectId())
                .userStandings(userStandings)
                .build();
    }

    @Override
    public void deleteAll() {
        teamsRepository.deleteAll();
        userStandingsRepository.deleteAll();
        projectLeaderboardsRepository.deleteAll();
    }

    @Override
    public void saveLeaderboard(ProjectLeaderboard projectLeaderboard, List<UserStanding> userStandings, Set<TeamMapping> teamMappings) {
        projectLeaderboardsRepository.save(projectLeaderboard);
        userStandings.forEach(standing -> usersRepository.save(standing.getUser()));
        userStandingsRepository.saveAll(userStandings);
        teamsRepository.saveAll(teamMappings);
    }
}
