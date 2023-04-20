package com.kpz.codereview.stats.leaderboard.repository;

import com.kpz.codereview.stats.leaderboard.model.UserStanding;
import org.springframework.data.repository.ListCrudRepository;

public interface UserStandingsRepository extends ListCrudRepository<UserStanding, Integer> {
}
