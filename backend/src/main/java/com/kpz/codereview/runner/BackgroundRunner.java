package com.kpz.codereview.runner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kpz.codereview.azureclient.model.domain.base.Member;
import com.kpz.codereview.azureclient.model.domain.base.Project;
import com.kpz.codereview.azureclient.model.azure.wrapper.WorkItem;
import com.kpz.codereview.azureclient.service.AzureClientService;
import com.kpz.codereview.notification.model.Notification;
import com.kpz.codereview.notification.model.NotificationType;
import com.kpz.codereview.notification.service.NotificationService;
import com.kpz.codereview.stats.leaderboard.model.base.ProjectLeaderboard;
import com.kpz.codereview.stats.leaderboard.model.base.TeamMapping;
import com.kpz.codereview.stats.leaderboard.model.base.User;
import com.kpz.codereview.stats.leaderboard.model.base.UserStanding;
import com.kpz.codereview.stats.leaderboard.service.ProjectLeaderboardsService;
import com.kpz.codereview.user.account.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RequiredArgsConstructor
@Component
public class BackgroundRunner {
    private final String OVERDUE_REVIEW_DESCRIPTION = """
            Overdue code review titled '%s' created at: %s
            """;

    private final String AZURE_CLIENT_CODE_REVIEW_ACCESS_LINK = "https://dev.azure.com/%s/%s/_workitems/edit/%d";

    private final String LEADERBOARD_DESCRIPTION = """
            You have been placed no. %d in the leaderboard for the last week for project %s
            """;

    private final String LEADERBOARD_ACCESS_LINK = "/leaderboard?project=%s";


    @Value("${azure.organization.name}")
    private String ORGANIZATION_NAME;

    @Value("${azure.code-review.done.states}")
    private List<String> doneStates;

    private final AzureClientService azureService;
    private final NotificationService notificationService;
    private final ProjectLeaderboardsService leaderboardsService;
    private final AccountService accountService;

    //Run every work day at 1am every month 0 0 1 ? * MON-FRI / 0 * * ? * *
    @Scheduled(cron = "0 0 1 ? * MON-FRI")
    public void createCodeReviewNotifications() throws JsonProcessingException {
        var projects = azureService.getProjectList();

        for (Project project : projects) {
            var codeReviews = azureService.getCodeReviewItemList(project.getName());

            codeReviews.stream()
                    .filter(codeReview -> {
                        String state = codeReview.getFields().getState();
                        return !doneStates.contains(state);
                    })
                    .filter(codeReview -> codeReview.getFields().getAssignedTo() != null)
                    .forEach(codeReview -> addIfAccountExists(codeReview, project.getName()));
        }
    }


    //Run every monday at 1am every month 0 0 1 ? * MON / 0 * * ? * *
    @Scheduled(cron = " 0 0 1 ? * MON")
    public void createLeaderBoardsAndNotifications() throws JsonProcessingException {
        leaderboardsService.deleteAll();

        var projects = azureService.getProjectList();

        for (var project : projects) {
            var codeReviews = azureService.getCodeReviewItemList(project.getName());

            Map<Member, Integer> scores = createScores(codeReviews);

            var teamMappings = addLazyMembersAndTeams(project, scores);

            List<UserStanding> userStandings = createUserStandings(project, scores);

            createAndSaveLeaderboardWithStandings(project, userStandings, teamMappings);

            createLeaderboardNotifications(project, userStandings);
        }
    }

    private void addIfAccountExists(WorkItem codeReview, String projectName) {
        String userEmail = codeReview.getFields()
                .getAssignedTo()
                .getUniqueName();

        if (accountService.existsByEmail(userEmail)) {

            Date creationDate = codeReview.getFields()
                    .getCreatedDate();

            String title = codeReview.getFields()
                    .getTitle();

            String link = AZURE_CLIENT_CODE_REVIEW_ACCESS_LINK.formatted(
                    ORGANIZATION_NAME, projectName, codeReview.getId()
            );

            String description = OVERDUE_REVIEW_DESCRIPTION.formatted(title, creationDate);

            var notification = Notification.builder()
                    .userEmail(userEmail)
                    .type(NotificationType.CODE_REVIEW.toString())
                    .link(link)
                    .description(description)
                    .build();

            notificationService.saveNotification(notification);
        }
    }

    private HashSet<TeamMapping> addLazyMembersAndTeams(Project project, Map<Member, Integer> scores) throws JsonProcessingException {
        var projectMembers = new HashSet<Member>();
        var teamMappings = new HashSet<TeamMapping>();
        var teams = azureService.getTeamList(project.getName());

        for (var team : teams) {
            var teamMembers = azureService.getMemberList(project.getId(), team.getId());
            projectMembers.addAll(teamMembers);

            teamMembers.forEach(member -> {
                var teamMapping = TeamMapping.builder()
                        .userEmail(member.getUniqueName())
                        .teamName(team.getName())
                        .build();

                teamMappings.add(teamMapping);
            });
        }

        projectMembers.forEach(member -> scores.putIfAbsent(member, 0));

        return teamMappings;
    }

    private void createLeaderboardNotifications(Project project, List<UserStanding> userStandings) {
        userStandings.forEach(userStanding -> {
            var email = userStanding.getUserEmail();

            if (accountService.existsByEmail(email)) {
                var link = LEADERBOARD_ACCESS_LINK.formatted(project.getId());

                var description = LEADERBOARD_DESCRIPTION.formatted(
                        userStanding.getPlace(), project.getName()
                );

                var notification = Notification.builder()
                        .userEmail(userStanding.getUserEmail())
                        .type(NotificationType.LEADERBOARD.toString())
                        .link(link)
                        .description(description)
                        .build();

                notificationService.saveNotification(notification);
            }
        });
    }

    private void createAndSaveLeaderboardWithStandings(Project project, List<UserStanding> userStandings, Set<TeamMapping> teamMappings) {
        ProjectLeaderboard leaderboard = ProjectLeaderboard.builder()
                .projectId(project.getId())
                .projectName(project.getName())
                .build();

        leaderboardsService.saveLeaderboard(leaderboard, userStandings, teamMappings);
    }

    private List<UserStanding> createUserStandings(Project project, Map<Member, Integer> scores) {
        List<UserStanding> userStandings = new ArrayList<>();

        scores.forEach((key, value) -> {
            User user = User.builder()
                    .userEmail(key.getUniqueName())
                    .displayName(key.getDisplayName())
                    .build();

            UserStanding standing = UserStanding.builder()
                    .projectId(project.getId())
                    .userEmail(key.getUniqueName())
                    .place(0)
                    .score(value)
                    .user(user)
                    .build();

            userStandings.add(standing);
        });

        userStandings.sort(
                Comparator.comparing(UserStanding::getScore).reversed()
        );

        int currPlace = 1;
        for (int i = 0; i < userStandings.size(); i++) {
            userStandings.get(i).setPlace(currPlace);

            if (i == userStandings.size() - 1) {
                continue;
            }

            if (userStandings.get(i + 1).getScore() != userStandings.get(i).getScore()) {
                currPlace++;
            }
        }

        return userStandings;
    }

    private Map<Member, Integer> createScores(List<WorkItem> codeReviews) {
        Map<Member, Integer> results = new HashMap<>();

        codeReviews.stream().filter(codeReview -> {
                    String state = codeReview.getFields().getState();
                    return doneStates.contains(state);
                })
                .filter(codeReview -> codeReview.getFields().getAssignedTo() != null)
                .filter(codeReview -> {
                    LocalDate completionDate = codeReview.getFields()
                            .getChangedDate()
                            .toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();

                    return completionDate != null &&
                            completionDate.isAfter(LocalDate.now().minusDays(7));
                })
                .forEach(codeReview -> {
                    String userEmail = codeReview.getFields()
                            .getAssignedTo()
                            .getUniqueName();

                    String userName = codeReview.getFields()
                            .getAssignedTo()
                            .getDisplayName();

                    var member = Member.builder()
                            .uniqueName(userEmail)
                            .displayName(userName)
                            .build();

                    results.computeIfPresent(member, (key, value) -> value + 1);
                    results.putIfAbsent(member, 1);
                });
        return results;
    }
}
