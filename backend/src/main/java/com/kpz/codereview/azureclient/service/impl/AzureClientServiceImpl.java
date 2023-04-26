package com.kpz.codereview.azureclient.service.impl;

import com.kpz.codereview.azureclient.model.component.CodeReviewerDTS;
import com.kpz.codereview.azureclient.model.wrapper.AllUsersSearchQuery;
import com.kpz.codereview.azureclient.model.wrapper.MemberSearchQuery;
import com.kpz.codereview.azureclient.model.wrapper.MemberWrapper;
import com.kpz.codereview.azureclient.model.wrapper.ProjectSearchQuery;
import com.kpz.codereview.azureclient.model.wrapper.TeamSearchQuery;
import com.kpz.codereview.azureclient.model.Member;
import com.kpz.codereview.azureclient.model.Team;
import com.kpz.codereview.azureclient.model.wrapper.WorkItemSearchQuery;
import com.kpz.codereview.exception.model.BadRequestBodyException;
import com.kpz.codereview.azureclient.model.WorkItem;
import com.kpz.codereview.azureclient.service.AzureClientService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.kpz.codereview.user.vacation.service.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AzureClientServiceImpl implements AzureClientService {

    private final RestTemplate restTemplate;

    private final VacationService vacationService;

    @Autowired
    public AzureClientServiceImpl(RestTemplate restTemplate, VacationService vacationService) {
        this.restTemplate = restTemplate;
        this.vacationService = vacationService;
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
            """;
    private static final String WIQL_GET_ALL_REVIEW_WORK_ITEMS = """
            Select * From WorkItems Where [System.WorkItemType] = 'Code Review'
            """;
    private static final String WIQL_GET_UNASSIGNED_CODE_REVIEW_ITEMS = """
            Select * From WorkItems
            Where [System.WorkItemType] = 'Code Review'
            And [System.CreatedBy] = '%s'
            And [System.AssignedTo] = ' '
            """;
    private final static String AZURE_DEVOPS_USERS_BASE_URL = "https://vssps.dev.azure.com";
    private final static String GET_ALL_USERS_CONTINUATION_TOKEN = "&continuationToken=%s";
    private final static String GET_ALL_USERS_URI_TEMPLATE = "%s/%s/_apis/graph/users?api-version=%s%s";
    private final static String CONTINUATION_TOKEN_HEADER = "X-MS-ContinuationToken";
    private static final String AZURE_DEVOPS_BASE_URL = "https://dev.azure.com";
    private static final String GET_WORK_ITEM_BY_ID_URI_TEMPLATE = "%s/%s/%s/_apis/wit/workitems/%s?api-version=%s";
    private static final String BASE_AZURE_REST_WIQL_URI_TEMPLATE = "%s/%s/%s/_apis/wit/wiql?api-version=%s";
    private static final String GET_PROJECTS_URI_TEMPLATE = "%s/%s/_apis/projects?api-version=%s";
    private static final String GET_TEAMS_URI_TEMPLATE = "%s/%s/_apis/projects/%s/teams?api-version=%s";
    private static final String GET_MEMBERS_URI_TEMPLATE = "%s/%s/_apis/projects/%s/teams/%s/members?api-version=%s";
    private static final String API_VERSION = "7.0";
    private static final String USERS_API_VERSION = "7.0-preview.1";
    private static final String QUERY = "query";
    private static final String NO_QUERY_PROVIDED_EXCEPTION = "Required 'query' field not provided!";
    private static final String BASIC_AUTHORIZATION_VALUE = "Basic %s";
    private static final String COLON = ":";

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
    public List<WorkItem> getUnassignedCodeReviewItemsByUser(String userEmail, String projectName) throws JsonProcessingException {
        return getWorkItemListFromQuery(WIQL_GET_UNASSIGNED_CODE_REVIEW_ITEMS.formatted(userEmail), projectName);
    }

    @Override
    public List<WorkItem> getCodeReviewItemList(String projectName) throws JsonProcessingException {
        return getWorkItemListFromQuery(WIQL_GET_ALL_REVIEW_WORK_ITEMS, projectName);
    }

    @Override
    public List<WorkItem> getWorkItemListFromQuery(String query, String projectName) throws JsonProcessingException {
        WorkItemSearchQuery workItemIds = getWorkItemIdsFromQuery(query, projectName);
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
    public List<WorkItem> getAssignedCodeReviewItemsByUser(String userEmail, String projectName) throws JsonProcessingException {
        return getWorkItemListFromQuery(WIQL_GET_ASSIGNED_CODE_REVIEW_ITEMS.formatted(userEmail), projectName);
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

    private List<WorkItem> createWorkItemList(WorkItemSearchQuery query, String projectName) throws JsonProcessingException {
        List<WorkItem> workItemsList = new ArrayList<>();

        for (var item : query.getWorkItems()) {
            WorkItem currItem = getWorkItemById(item.getId(), projectName);
            workItemsList.add(currItem);
        }

        return workItemsList;
    }

    private WorkItemSearchQuery getWorkItemIdsFromQuery(String query, String projectName) throws JsonProcessingException {
        ResponseEntity<String> response = restTemplate.exchange(
                genBaseAzureRestWIQLUri(projectName),
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


    private String genGetWorkItemByIdUri(int id, String projectName) {
        return GET_WORK_ITEM_BY_ID_URI_TEMPLATE.formatted(
                AZURE_DEVOPS_BASE_URL,
                ORGANIZATION_NAME,
                projectName,
                id,
                API_VERSION
        );
    }

    private String genBaseAzureRestWIQLUri(String projectName) {
        return BASE_AZURE_REST_WIQL_URI_TEMPLATE.formatted(
                AZURE_DEVOPS_BASE_URL,
                ORGANIZATION_NAME,
                projectName,
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
                .filter(workItem -> workItem.getFields().getAssignedTo() != null &&
                                    !doneStates.contains(workItem.getFields().getState()))
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

    private Set<CodeReviewerDTS> sortCodeReviewers(Set<CodeReviewerDTS> codeReviewerDTSSetToSort){
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
        for(var team : projectTeams){
            Set<Member> teamMembers = getMemberList(projectName, team.getId())
                    .getMembers()
                    .stream()
                    .map(MemberWrapper::getIdentity)
                    .collect(Collectors.toSet());

            teamMembers.forEach(member -> {
                reviewersMap.put(
                        member.getUniqueName(),
                        CodeReviewerDTS.builder()
                                .displayName(member.getDisplayName())
                                .uniqueName(member.getUniqueName())
                                .teamName(team.getName())
                                .activeReviews(0)
                                .availability(true)
                                .build());
            });
        }
        return reviewersMap;
    }
}