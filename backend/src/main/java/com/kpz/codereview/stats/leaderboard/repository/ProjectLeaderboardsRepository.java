package com.kpz.codereview.stats.leaderboard.repository;

import com.kpz.codereview.stats.leaderboard.model.base.ProjectLeaderboard;
import org.springframework.data.repository.ListCrudRepository;

public interface ProjectLeaderboardsRepository extends ListCrudRepository<ProjectLeaderboard, String> {}
