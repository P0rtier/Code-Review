package com.kpz.codereview.stats.leaderboard.repository;

import com.kpz.codereview.stats.leaderboard.model.base.TeamMapping;
import org.springframework.data.repository.ListCrudRepository;

public interface TeamsRepository extends ListCrudRepository<TeamMapping, String> {
}
