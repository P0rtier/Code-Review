package com.kpz.codereview.stats.leaderboard.repository;

import com.kpz.codereview.stats.leaderboard.model.base.User;
import org.springframework.data.repository.ListCrudRepository;

public interface UsersRepository extends ListCrudRepository<User, String> {
}
