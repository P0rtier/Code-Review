package com.kpz.codereview.azureclient.service.impl;

import com.kpz.codereview.base.exception.BadRequestBodyException;
import com.kpz.codereview.azureclient.model.wrapper.MemberSearchQuery;
import com.kpz.codereview.azureclient.model.wrapper.ProjectSearchQuery;
import com.kpz.codereview.azureclient.model.wrapper.TeamSearchQuery;
import com.kpz.codereview.azureclient.model.WorkItem;
import com.kpz.codereview.azureclient.model.wrapper.WorkItemSearchQuery;
import com.kpz.codereview.azureclient.service.AzureClientService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Map;

@Service
public class AzureClientServiceImpl implements AzureClientService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${AZURE_API_ACCESS_TOKEN}")
    private String PERSONAL_ACCESS_TOKEN;
    @Value("${AZURE_ORGANIZATION_NAME}")
    private String ORGANIZATION_NAME;

    private static final String WIQL_GET_ALL_REVIEW_WORK_ITEMS = "Select * From WorkItems Where [System.WorkItemType] = 'Code Review'";
    private static final String AZURE_DEVOPS_BASE_URL = "https://dev.azure.com";
    private static final String GET_WORK_ITEM_BY_ID_URI_TEMPLATE= "%s/%s/%s/_apis/wit/workitems/%s?api-version=%s";
    private static final String BASE_AZURE_REST_WIQL_URI_TEMPLATE= "%s/%s/%s/_apis/wit/wiql?api-version=%s";
    private static final String GET_PROJECTS_URI_TEMPLATE = "%s/%s/_apis/projects?api-version=%s";
    private static final String GET_TEAMS_URI_TEMPLATE = "%s/%s/_apis/projects/%s/teams?api-version=%s";
    private static final String GET_MEMBERS_URI_TEMPLATE = "%s/%s/_apis/projects/%s/teams/%s/members?api-version=%s";
    private static final String API_VERSION = "7.0";
    private static final String QUERY = "query";
    private static final String NO_QUERY_PROVIDED_EXCEPTION = "Required 'query' field not provided!";
    private static final String BASIC_AUTHORIZATION_VALUE = "Basic %s";
    private static final String COLON = ":";

    private final ObjectMapper om = new ObjectMapper();

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

    private HttpHeaders genAuthHeaderKey(){
        String authHeaderString = BASIC_AUTHORIZATION_VALUE.formatted(
                Base64.getEncoder().encodeToString((COLON + PERSONAL_ACCESS_TOKEN).getBytes())
        );
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, authHeaderString);

        return headers;
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
}