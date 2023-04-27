package com.kpz.codereview.runner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kpz.codereview.azureclient.model.base.Project;
import com.kpz.codereview.azureclient.model.base.WorkItem;
import com.kpz.codereview.azureclient.service.AzureClientService;
import com.kpz.codereview.notification.model.Notification;
import com.kpz.codereview.notification.model.NotificationType;
import com.kpz.codereview.notification.service.NotificationService;
import com.kpz.codereview.stats.leaderboard.model.ProjectLeaderboard;
import com.kpz.codereview.stats.leaderboard.model.UserStanding;
import com.kpz.codereview.stats.leaderboard.service.ProjectLeaderboardsService;
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
import java.util.List;
import java.util.Map;

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

    private final AzureClientService service;
    private final NotificationService notificationService;
    private final ProjectLeaderboardsService leaderboardsService;

    //Run every work day at 1am every month 0 0 1 ? * MON-FRI / 0 * * ? * *
    @Scheduled(cron = "0 0 1 ? * MON-FRI")
    public void createCodeReviewNotifications() throws JsonProcessingException {
        var projects = service.getProjectList()
                .getProjects();

        for (Project project : projects) {
            var codeReviews = service.getCodeReviewItemList(project.getName());

            codeReviews.stream()
                    .filter(codeReview -> {
                        String state = codeReview.getFields().getState();
                        return !doneStates.contains(state);
                    })
                    .filter(codeReview -> codeReview.getFields().getAssignedTo() != null)
                    .forEach(codeReview -> {
                        String userEmail = codeReview.getFields()
                                .getAssignedTo()
                                .getUniqueName();

                        Date creationDate = codeReview.getFields()
                                .getCreatedDate();

                        String title = codeReview.getFields()
                                .getTitle();

                        String link = AZURE_CLIENT_CODE_REVIEW_ACCESS_LINK.formatted(
                                ORGANIZATION_NAME, project.getName(), codeReview.getId()
                        );

                        String description = OVERDUE_REVIEW_DESCRIPTION.formatted(title, creationDate);

                        var notification = Notification.builder()
                                .userEmail(userEmail)
                                .type(NotificationType.CODE_REVIEW.toString())
                                .link(link)
                                .description(description)
                                .build();

                        notificationService.saveNotification(notification);
                    });
        }
    }


    //Run every monday at 1am every month
    @Scheduled(cron = "0 0 1 ? * MON")
    public void createLeaderBoardsAndNotifications() throws JsonProcessingException {
        leaderboardsService.deleteAll();

        var projects = service.getProjectList()
                .getProjects();

        for (var project : projects) {
            var codeReviews = service.getCodeReviewItemList(project.getName());

            Map<String, Integer> scores = createScores(codeReviews);

            List<UserStanding> userStandings = createUserStandings(project, scores);

            createAndSaveLeaderboardWithStandings(project, userStandings);

            createLeaderboardNotifications(project, userStandings);
        }
    }

    private void createLeaderboardNotifications(Project project, List<UserStanding> userStandings) {
        userStandings.forEach(userStanding -> {
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
        });
    }

    private void createAndSaveLeaderboardWithStandings(Project project, List<UserStanding> userStandings) {
        ProjectLeaderboard leaderboard = ProjectLeaderboard.builder()
                .projectId(project.getId())
                .projectName(project.getName())
                .build();

        leaderboardsService.saveLeaderboard(leaderboard, userStandings);
    }

    private List<UserStanding> createUserStandings(Project project, Map<String, Integer> scores) {
        List<UserStanding> userStandings = new ArrayList<>();

        scores.forEach((key, value) -> {
            UserStanding standing = UserStanding.builder()
                    .projectId(project.getId())
                    .userEmail(key)
                    .place(0)
                    .score(value)
                    .build();

            userStandings.add(standing);
        });

        userStandings.sort(
                Comparator.comparing(UserStanding::getScore).reversed()
        );

        userStandings.forEach(userStanding -> {
            int place = userStandings.indexOf(userStanding) + 1;
            userStanding.setPlace(place);
        });
        return userStandings;
    }

    private Map<String, Integer> createScores(List<WorkItem> codeReviews) {
        Map<String, Integer> results = new HashMap<>();

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

                    results.computeIfPresent(userEmail, (key, value) -> value + 1);
                    results.putIfAbsent(userEmail, 1);
                });
        return results;
    }
}
