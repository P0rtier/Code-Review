package com.kpz.codereview.stats.leaderboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "project_leaderboards")
public class ProjectLeaderboard {
    @Id
    private String projectId;
    private String projectName;

    @OneToMany(mappedBy = "projectId")
    private List<UserStanding> userStandings;
}
