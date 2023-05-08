package com.kpz.codereview.azureclient.service.impl;

import com.kpz.codereview.azureclient.model.base.Project;
import com.kpz.codereview.azureclient.model.base.component.CodeReviewerDTS;
import com.kpz.codereview.azureclient.model.base.component.ReviewStats;
import com.kpz.codereview.azureclient.model.base.component.CodeReviewerStatDTS;
import com.kpz.codereview.azureclient.model.base.wrapper.AllUsersSearchQuery;
import com.kpz.codereview.azureclient.model.base.wrapper.MemberSearchQuery;
import com.kpz.codereview.azureclient.model.base.wrapper.MemberWrapper;
import com.kpz.codereview.azureclient.model.base.wrapper.ProjectSearchQuery;
import com.kpz.codereview.azureclient.model.base.wrapper.TeamSearchQuery;
import com.kpz.codereview.azureclient.model.base.Member;
import com.kpz.codereview.azureclient.model.base.Team;
import com.kpz.codereview.azureclient.model.base.wrapper.WorkItemSearchQuery;
import com.kpz.codereview.azureclient.model.domain.AssignedReview;
import com.kpz.codereview.azureclient.model.domain.ProjectSummary;
import com.kpz.codereview.azureclient.model.domain.UnassignedReview;
import com.kpz.codereview.exception.model.BadAzureAPIResponse;
import com.kpz.codereview.exception.model.BadRequestBodyException;
import com.kpz.codereview.azureclient.model.base.WorkItem;
import com.kpz.codereview.azureclient.service.AzureClientService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.kpz.codereview.exception.model.EntityNotFoundException;
import com.kpz.codereview.user.account.service.AccountService;
import com.kpz.codereview.user.vacation.service.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AzureClientServiceImpl implements AzureClientService {

    private final RestTemplate restTemplate;

    private final VacationService vacationService;
    private final AccountService accountService;

    @Autowired
    public AzureClientServiceImpl(RestTemplate restTemplate, VacationService vacationService, AccountService accountService) {
        this.restTemplate = restTemplate;
        this.vacationService = vacationService;
        this.accountService = accountService;
    }


    @Value("${azure.api.access.token}")
    private String PERSONAL_ACCESS_TOKEN;
    @Value("${azure.organization.name}")
    private String ORGANIZATION_NAME;
    @Value("${azure.code-review.done.states}")
    private List<String> doneStates;

    private static final String WIQL_GET_ASSIGNED_CODE_REVIEW_ITEMS = """
            Select * From WorkItems
            Where [System.WorkItemType] = 'Code Review'
            And [System.AssignedTo] = '%s'
            And [System.TeamProject] = '%s'
            """;
    private static final String WIQL_GET_ALL_REVIEW_WORK_ITEMS = """
            Select * From WorkItems Where [System.WorkItemType] = 'Code Review'
            """;
    private static final String WIQL_GET_UNASSIGNED_CODE_REVIEW_ITEMS = """
            Select * From WorkItems
            Where [System.WorkItemType] = 'Code Review'
            And [System.CreatedBy] = '%s'
            And [System.AssignedTo] = ' '
            And [System.TeamProject] = '%s'
            """;
    private final static String AZURE_DEVOPS_USERS_BASE_URL = "https://vssps.dev.azure.com";
    private final static String GET_ALL_USERS_CONTINUATION_TOKEN = "&continuationToken=%s";
    private final static String GET_ALL_USERS_URI_TEMPLATE = "%s/%s/_apis/graph/users?api-version=%s%s";
    private final static String CONTINUATION_TOKEN_HEADER = "X-MS-ContinuationToken";

    private static final String AZURE_DEVOPS_BASE_URL = "https://dev.azure.com";
    private static final String UPDATE_REVIEWER_URI_TEMPLATE = "%s/%s/%s/_apis/wit/workitems/%s?api-version=%s";
    private static final String GET_WORK_ITEM_BY_ID_URI_TEMPLATE = "%s/%s/%s/_apis/wit/workitems/%s?api-version=%s";
    private static final String BASE_AZURE_REST_WIQL_URI_TEMPLATE = "%s/%s/_apis/wit/wiql?api-version=%s";
    private static final String GET_PROJECTS_URI_TEMPLATE = "%s/%s/_apis/projects?api-version=%s";
    private static final String GET_TEAMS_URI_TEMPLATE = "%s/%s/_apis/projects/%s/teams?api-version=%s";
    private static final String GET_MEMBERS_URI_TEMPLATE = "%s/%s/_apis/projects/%s/teams/%s/members?api-version=%s";
    private static final String API_VERSION = "7.0";
    private static final String USERS_API_VERSION = "7.0-preview.1";
    private static final String QUERY = "query";
    private static final String NO_QUERY_PROVIDED_EXCEPTION = "Required 'query' field not provided!";
    private static final String USER_NOT_FOUND_EXCEPTION = "User from token was not found!";
    private static final String BASIC_AUTHORIZATION_VALUE = "Basic %s";
    private static final String COLON = ":";
    private final String AZURE_CLIENT_CODE_REVIEW_ACCESS_LINK_TEMPLATE = "https://dev.azure.com/%s/%s/_workitems/edit/%d";
    private static final String TAGS_SPLITTER = ";";
    private static final String NEW_REVIEWER_PATCH_BODY = """
            [
              {
                "op": "replace",
                "path": "/fields/System.AssignedTo",
                "value": "%s"
              }
            ]
            """;
    private static final String PATCH_CONTENT_TYPE = "application/json-patch+json";

    private final ObjectMapper om = new ObjectMapper();

    @Override
    public Set<String> getAllUsersFromOrg() throws JsonProcessingException {
        Set<String> users = new HashSet<>();
        String token = null;
        ResponseEntity<String> response;

        do {
            if (token == null) {
                response = restTemplate.exchange(
                        genGetUsersURI(),
                        HttpMethod.GET,
                        new HttpEntity<>(genAuthHeaderKey()),
                        String.class
                );
            } else {
                response = restTemplate.exchange(
                        genGetUsersURI(token),
                        HttpMethod.GET,
                        new HttpEntity<>(genAuthHeaderKey()),
                        String.class
                );
            }

            token = response.getHeaders().getFirst(CONTINUATION_TOKEN_HEADER);

            var userWrappers = om.readValue(
                            response.getBody(),
                            AllUsersSearchQuery.class
                    )
                    .getUsers();

            userWrappers.forEach(userWrapper ->
                    users.add(userWrapper.getMailAddress())
            );
        } while (token != null);

        users.remove("");
        return users;
    }

    @Override
    public WorkItem getWorkItemById(int id, String projectName) throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                genGetWorkItemByIdUri(id, projectName),
                HttpMethod.GET,
                new HttpEntity<>(genAuthHeaderKey()),
                String.class
        );
        return om.readValue(
                response.getBody(),
                WorkItem.class
        );
    }

    @Override
    public List<WorkItem> getCodeReviewItemList(String projectName) throws JsonProcessingException {
        return getWorkItemListFromQuery(WIQL_GET_ALL_REVIEW_WORK_ITEMS, projectName);
    }

    @Override
    public List<WorkItem> getWorkItemListFromQuery(String query, String projectName) throws JsonProcessingException {
        WorkItemSearchQuery workItemIds = getWorkItemIdsFromQuery(query);
        return createWorkItemList(workItemIds, projectName);
    }

    @Override
    public String extractQueryFromBody(String requestBody) {
        try {
            JsonNode jsonNode = om.readTree(requestBody);

            return jsonNode
                    .get(QUERY)
                    .asText();

        } catch (NullPointerException e) {
            throw new BadRequestBodyException(NO_QUERY_PROVIDED_EXCEPTION);
        } catch (JsonProcessingException e) {
            throw new BadRequestBodyException(e.getMessage());
        }
    }

    @Override
    public ProjectSearchQuery getProjectList() throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                genGetProjectsUri(),
                HttpMethod.GET,
                new HttpEntity<>(genAuthHeaderKey()),
                String.class
        );
        return om.readValue(
                response.getBody(),
                ProjectSearchQuery.class
        );
    }

    @Override
    public TeamSearchQuery getTeamList(String projectId) throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                genGetTeamsUri(projectId),
                HttpMethod.GET,
                new HttpEntity<>(genAuthHeaderKey()),
                String.class
        );
        return om.readValue(
                response.getBody(),
                TeamSearchQuery.class
        );
    }

    @Override
    public MemberSearchQuery getMemberList(String projectId, String teamId) throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                genGetMembersUri(projectId, teamId),
                HttpMethod.GET,
                new HttpEntity<>(genAuthHeaderKey()),
                String.class
        );
        return om.readValue(
                response.getBody(),
                MemberSearchQuery.class
        );
    }

    @Override
    public List<String> getUserProjects(String userEmail) throws JsonProcessingException {
        List<String> userProjects = new ArrayList<>();

        List<Project> projects = getProjectList().getProjects();

        for (Project project : projects) {
            var projectId = project.getId();

            List<String> teams = getTeamList(projectId).getTeams()
                    .stream()
                    .map(Team::getId)
                    .toList();

            for (String teamId : teams) {
                List<String> members = getMemberList(projectId, teamId).getMembers()
                        .stream()
                        .map(MemberWrapper::getIdentity)
                        .map(Member::getUniqueName)
                        .toList();

                if (members.contains(userEmail)) {
                    userProjects.add(project.getName());
                }
            }
        }

        return userProjects;
    }

    @Override
    public List<ProjectSummary> getUserProjectSummaries(String userUUID) throws JsonProcessingException {
        var user = accountService.findById(UUID.fromString(userUUID));

        if (user.isEmpty()) {
            throw new EntityNotFoundException(USER_NOT_FOUND_EXCEPTION);
        }

        var userEmail = user.get().getEmail();
        List<ProjectSummary> projectSummaries = new ArrayList<>();

        var userProjects = getUserProjects(userEmail);

        for (String projectName : userProjects) {
            var unassignedReviews = getUnassignedCodeReviewItemsByUser(userEmail, projectName);
            var assignedReviews = getAssignedCodeReviewItemsByUser(userEmail, projectName);

            var currSummary = ProjectSummary.builder()
                    .name(projectName)
                    .assignedReviews(assignedReviews)
                    .unassignedReviews(unassignedReviews)
                    .build();

            projectSummaries.add(currSummary);
        }

        return projectSummaries;
    }

    @Override
    public Set<CodeReviewerDTS> getProjectSortedReviewers(String projectName,
                                                          String startDate, String endDate) throws JsonProcessingException {

        List<WorkItem> codeReviewWorkItemList = filterFinishedAndUnassignedCodeReviews(getCodeReviewItemList(projectName));
        Map<String, CodeReviewerDTS> projectReviewersMap = genCodeReviewerHashMapFromProject(projectName);
        Set<CodeReviewerDTS> codeReviewerDTSSetToSort = mapWorkItemListToCodeReviewerDTSSet(codeReviewWorkItemList, projectReviewersMap);

        codeReviewerDTSSetToSort.forEach(person ->
            person.setAvailability(
                    vacationService.userAvailability(person.getUniqueName(),
                            LocalDate.parse(startDate),
                            LocalDate.parse(endDate)
                    )));

        return sortCodeReviewers(codeReviewerDTSSetToSort);

    }

    @Override
    public void assignCodeReviewToUser(Integer workItemId, String userEmail, String projectName) throws JsonProcessingException {
        var allUsers = getAllUsersFromOrg();
        var userExists = allUsers.stream()
                .anyMatch(user -> user.equals(userEmail));

        if (!userExists) {
            throw new EntityNotFoundException(USER_NOT_FOUND_EXCEPTION);
        }

        WebClient.create().method(HttpMethod.PATCH)
                .uri(genGetWorkItemByIdUri(workItemId, projectName))
                .header(HttpHeaders.AUTHORIZATION, genAuthHeaderValue())
                .header(HttpHeaders.CONTENT_TYPE, PATCH_CONTENT_TYPE)
                .bodyValue(NEW_REVIEWER_PATCH_BODY.formatted(userEmail))
                .retrieve()
                .onStatus(
                        httpStatusCode -> httpStatusCode.is4xxClientError() || httpStatusCode.is5xxServerError(),
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .flatMap(body -> Mono.error(new BadAzureAPIResponse(body)))
                ).bodyToMono(String.class)
                .block();
    }

    @Override
    public Set<CodeReviewerStatDTS> getReviewersStatistics(String projectName, String startDate, String endDate) throws JsonProcessingException, ParseException {
        Map<Boolean, List<WorkItem>> codeReviewWorkItemMap = filterAssignedCodeReviewsFromTimePeriod(getCodeReviewItemList(projectName), startDate, endDate);
        Map<String, CodeReviewerStatDTS> userReviewStatDTSMap = genUserReviewStatisticsHashMapFromProject(projectName);
        Set<CodeReviewerStatDTS> codeReviewerStatDTSSet = mapWorkItemListToUserReviewStatDTSSet(codeReviewWorkItemMap, userReviewStatDTSMap);

        return calculateAvgTimeOfDoneReviews(codeReviewerStatDTSSet);

    }

    private List<AssignedReview> getAssignedCodeReviewItemsByUser(String userEmail, String projectName) throws JsonProcessingException {
        var workItems = getWorkItemListFromQuery(
                WIQL_GET_ASSIGNED_CODE_REVIEW_ITEMS.formatted(userEmail, projectName),
                projectName
        );

        workItems = filterFinishedCodeReviews(workItems);
        List<AssignedReview> mappedWorkItems = new ArrayList<>();

        workItems.forEach(workItem -> {
            var id = workItem.getId();
            var title = workItem.getFields().getTitle();
            var link = AZURE_CLIENT_CODE_REVIEW_ACCESS_LINK_TEMPLATE
                    .formatted(ORGANIZATION_NAME, projectName, id);
            var project = workItem.getFields().getTeamProject();
            var scheduledByName = workItem.getFields().getCreatedBy().getDisplayName();
            var scheduledByEmail = workItem.getFields().getCreatedBy().getUniqueName();
            var createddate = workItem.getFields().getCreatedDate();

            var tagString = workItem.getFields().getTags();
            List<String> tags = new ArrayList<>();

            if (tagString != null) {
                tags.addAll(
                        Arrays.asList(tagString.split(TAGS_SPLITTER))
                );
            }

            var mappedReview = AssignedReview.builder()
                    .id(id)
                    .title(title)
                    .link(link)
                    .tags(tags)
                    .project(project)
                    .scheduledByName(scheduledByName)
                    .scheduledByEmail(scheduledByEmail)
                    .createdDate(createddate)
                    .build();

            mappedWorkItems.add(mappedReview);
        });

        return mappedWorkItems;
    }

    private List<UnassignedReview> getUnassignedCodeReviewItemsByUser(String userEmail, String projectName) throws JsonProcessingException {
        var workItems = getWorkItemListFromQuery(
                WIQL_GET_UNASSIGNED_CODE_REVIEW_ITEMS.formatted(userEmail, projectName),
                projectName
        );
        List<UnassignedReview> mappedWorkItems = new ArrayList<>();

        workItems.forEach(workItem -> {
            var id = workItem.getId();
            var title = workItem.getFields().getTitle();
            var link = AZURE_CLIENT_CODE_REVIEW_ACCESS_LINK_TEMPLATE
                    .formatted(ORGANIZATION_NAME, projectName, id);
            var project = workItem.getFields().getTeamProject();
            var createdDate = workItem.getFields().getCreatedDate();

            var tagString = workItem.getFields().getTags();
            List<String> tags = new ArrayList<>();

            if (tagString != null) {
                tags.addAll(
                        Arrays.asList(tagString.split(TAGS_SPLITTER))
                );
            }

            var mappedReview = UnassignedReview.builder()
                    .id(id)
                    .title(title)
                    .link(link)
                    .project(project)
                    .createdDate(createdDate)
                    .tags(tags)
                    .build();

            mappedWorkItems.add(mappedReview);
        });

        return mappedWorkItems;
    }

    private List<WorkItem> createWorkItemList(WorkItemSearchQuery query, String projectName) throws JsonProcessingException {
        List<WorkItem> workItemsList = new ArrayList<>();

        for (var item : query.getWorkItems()) {
            WorkItem currItem = getWorkItemById(item.getId(), projectName);
            workItemsList.add(currItem);
        }

        return workItemsList;
    }

    private WorkItemSearchQuery getWorkItemIdsFromQuery(String query) throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                genBaseAzureRestWIQLUri(),
                HttpMethod.POST,
                genAuthenticationRequestWithWIQLBody(query),
                String.class
        );

        return om.readValue(
                response.getBody(),
                WorkItemSearchQuery.class
        );
    }

    private HttpHeaders genAuthHeaderKey() {
        String authHeaderString = BASIC_AUTHORIZATION_VALUE.formatted(
                Base64.getEncoder().encodeToString((COLON + PERSONAL_ACCESS_TOKEN).getBytes())
        );
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, authHeaderString);

        return headers;
    }

    private String genAuthHeaderValue() {
        return BASIC_AUTHORIZATION_VALUE.formatted(
                Base64.getEncoder().encodeToString((COLON + PERSONAL_ACCESS_TOKEN).getBytes())
        );
    }


    private String genGetUsersURI() {
        return GET_ALL_USERS_URI_TEMPLATE.formatted(
                AZURE_DEVOPS_USERS_BASE_URL,
                ORGANIZATION_NAME,
                USERS_API_VERSION,
                ""
        );
    }

    private String genGetUsersURI(String continuationToken) {
        var token = GET_ALL_USERS_CONTINUATION_TOKEN
                .formatted(continuationToken);

        return GET_ALL_USERS_URI_TEMPLATE.formatted(
                AZURE_DEVOPS_USERS_BASE_URL,
                ORGANIZATION_NAME,
                USERS_API_VERSION,
                token
        );
    }

    private String genGetProjectsUri() {
        return GET_PROJECTS_URI_TEMPLATE.formatted(
                AZURE_DEVOPS_BASE_URL,
                ORGANIZATION_NAME,
                API_VERSION
        );
    }

    private String genGetTeamsUri(String projectId) {
        return GET_TEAMS_URI_TEMPLATE.formatted(
                AZURE_DEVOPS_BASE_URL,
                ORGANIZATION_NAME,
                projectId,
                API_VERSION
        );
    }

    private String genGetMembersUri(String projectId, String teamId) {
        return GET_MEMBERS_URI_TEMPLATE.formatted(
                AZURE_DEVOPS_BASE_URL,
                ORGANIZATION_NAME,
                projectId,
                teamId,
                API_VERSION
        );
    }

    private String genUpdateReviewerUri(Integer workItemId, String projectName) {
        return UPDATE_REVIEWER_URI_TEMPLATE.formatted(
                AZURE_DEVOPS_BASE_URL,
                ORGANIZATION_NAME,
                projectName,
                workItemId,
                API_VERSION
        );
    }


    private String genGetWorkItemByIdUri(int id, String projectName) {
        return GET_WORK_ITEM_BY_ID_URI_TEMPLATE.formatted(
                AZURE_DEVOPS_BASE_URL,
                ORGANIZATION_NAME,
                projectName,
                id,
                API_VERSION
        );
    }

    private String genBaseAzureRestWIQLUri() {
        return BASE_AZURE_REST_WIQL_URI_TEMPLATE.formatted(
                AZURE_DEVOPS_BASE_URL,
                ORGANIZATION_NAME,
                API_VERSION
        );
    }

    private HttpEntity<?> genAuthenticationRequestWithWIQLBody(String query) {
        return new HttpEntity<>(
                Map.of(QUERY, query),
                genAuthHeaderKey()
        );
    }

    private List<WorkItem> filterFinishedAndUnassignedCodeReviews(List<WorkItem> codeReviewItemList) throws JsonProcessingException {
        return codeReviewItemList
                .stream()
                .filter(workItem -> workItem.getFields().getAssignedTo() != null)
                .filter(workItem -> !doneStates.contains(workItem.getFields().getState()))
                .toList();
    }

    private Map<Boolean, List<WorkItem>> filterAssignedCodeReviewsFromTimePeriod(List<WorkItem> codeReviewItemList, String startDate, String endDate){
          return codeReviewItemList.stream()
                .filter(workItem -> workItem.getFields().getAssignedTo() != null)
                  .filter(workItem -> {
                      LocalDate workItemCreatedDate = workItem.getFields().getCreatedDate()
                              .toInstant()
                              .atZone(ZoneId.systemDefault())
                              .toLocalDate();

                      LocalDate workItemLastChangedDate = workItem.getFields().getChangedDate()
                              .toInstant()
                              .atZone(ZoneId.systemDefault())
                              .toLocalDate();

                      return !workItemCreatedDate.isBefore(LocalDate.parse(startDate)) &
                              !workItemLastChangedDate.isAfter(LocalDate.parse(endDate));
                  })
                .collect(Collectors.partitioningBy(workItem -> !doneStates.contains(workItem.getFields().getState())));
    }

    private List<WorkItem> filterFinishedCodeReviews(List<WorkItem> codeReviewItemList) throws JsonProcessingException {
        return codeReviewItemList
                .stream()
                .filter(workItem -> !doneStates.contains(workItem.getFields().getState()))
                .toList();
    }

    private Set<CodeReviewerDTS> mapWorkItemListToCodeReviewerDTSSet(
            List<WorkItem> filteredWorkItemList, Map<String, CodeReviewerDTS> projectReviewersMap) throws JsonProcessingException {

        filteredWorkItemList.forEach(workItem -> {
            String uniqueName = workItem.getFields().getAssignedTo().getUniqueName();
            projectReviewersMap.computeIfPresent(uniqueName, (key, person) -> {
                person.setActiveReviews(person.getActiveReviews() + 1);
                return person;
            });
        });
        return new HashSet<>(projectReviewersMap.values());
    }

    private Set<CodeReviewerStatDTS> mapWorkItemListToUserReviewStatDTSSet(
            Map<Boolean, List<WorkItem>> filteredWorkItemList, Map<String, CodeReviewerStatDTS> projectReviewersMap) throws JsonProcessingException {

        //not done
        filteredWorkItemList.get(true).forEach(workItem -> {
            String uniqueName = workItem.getFields().getAssignedTo().getUniqueName();
            projectReviewersMap.computeIfPresent(uniqueName, (key, person) -> {
                person.getReviewStats().setActive(person.getReviewStats().getActive()+1);
                return person;
            });
        });


        //done
        filteredWorkItemList.get(false).forEach(workItem -> {
            String uniqueName = workItem.getFields().getAssignedTo().getUniqueName();
            projectReviewersMap.computeIfPresent(uniqueName, (key, person) -> {
                person.getReviewStats().setDone(person.getReviewStats().getDone()+1);
                person.getReviewStats().setAvgReviewHours(person.getReviewStats().getAvgReviewHours() + computeDateHoursDifference(
                        workItem.getFields().getCreatedDate(),
                        workItem.getFields().getChangedDate()
                ));
                return person;
            });
        });
        return new HashSet<>(projectReviewersMap.values());
    }

    private long computeDateHoursDifference(Date startDate, Date endDate){
        LocalDateTime localDateTimeStart = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        LocalDateTime localDateTimeEnd = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        return ChronoUnit.HOURS.between(localDateTimeStart, localDateTimeEnd);
    }

    private Set<CodeReviewerStatDTS> calculateAvgTimeOfDoneReviews(Set<CodeReviewerStatDTS> codeReviewerStatDTSSet){
        codeReviewerStatDTSSet.forEach(codeReviewerStatDTS -> {
            if(codeReviewerStatDTS.getReviewStats().getDone() != 0){
                codeReviewerStatDTS.getReviewStats().setAvgReviewHours(
                        codeReviewerStatDTS.getReviewStats().getAvgReviewHours() / codeReviewerStatDTS.getReviewStats().getDone());
            }
        });
        return codeReviewerStatDTSSet;
    }

    private Set<CodeReviewerDTS> sortCodeReviewers(Set<CodeReviewerDTS> codeReviewerDTSSetToSort) {
        return codeReviewerDTSSetToSort.stream()
                .sorted(
                        Comparator.comparing(CodeReviewerDTS::isAvailability).reversed()
                                .thenComparing(CodeReviewerDTS::getActiveReviews)
                )
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    private Map<String, CodeReviewerDTS> genCodeReviewerHashMapFromProject(String projectName) throws JsonProcessingException {
        List<Team> projectTeams = getTeamList(projectName).getTeams();
        Map<String, CodeReviewerDTS> reviewersMap = new HashMap<>();
        for (var team : projectTeams) {
            genTeamMembers(projectName, team).forEach(member -> {

                reviewersMap.computeIfPresent(member.getUniqueName(), (key, person) -> {
                    person.getTeamNames().add(team.getName());
                    return person;
                });

                reviewersMap.computeIfAbsent(member.getUniqueName(), key ->
                        CodeReviewerDTS.builder()
                                .displayName(member.getDisplayName())
                                .uniqueName(member.getUniqueName())
                                .teamNames(new ArrayList<>(List.of(team.getName())))
                                .activeReviews(0)
                                .availability(true)
                                .build());
            });
        }
        return reviewersMap;
    }

    private Map<String, CodeReviewerStatDTS> genUserReviewStatisticsHashMapFromProject(String projectName) throws JsonProcessingException {
        List<Team> projectTeams = getTeamList(projectName).getTeams();
        Map<String, CodeReviewerStatDTS> reviewersMap = new HashMap<>();
        for (var team : projectTeams) {
            genTeamMembers(projectName, team).forEach(member -> {
                reviewersMap.computeIfAbsent(member.getUniqueName(), key ->
                        CodeReviewerStatDTS.builder()
                        .displayName(member.getDisplayName())
                        .uniqueName(member.getUniqueName())
                        .reviewStats(
                                ReviewStats.builder()
                                .done(0)
                                .active(0)
                                .avgReviewHours(0L)
                                .build())
                        .build()
                        );
            });
        }
        return reviewersMap;
    }

    private Set<Member> genTeamMembers(String projectName, Team team) throws JsonProcessingException {
        return getMemberList(projectName, team.getId())
                .getMembers()
                .stream()
                .map(MemberWrapper::getIdentity)
                .collect(Collectors.toSet());
    }
}