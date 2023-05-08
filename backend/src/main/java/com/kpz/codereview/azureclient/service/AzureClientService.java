package com.kpz.codereview.azureclient.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kpz.codereview.azureclient.model.base.WorkItem;
import com.kpz.codereview.azureclient.model.base.component.CodeReviewerDTS;
import com.kpz.codereview.azureclient.model.base.component.CodeReviewerStatDTS;
import com.kpz.codereview.azureclient.model.base.wrapper.MemberSearchQuery;
import com.kpz.codereview.azureclient.model.base.wrapper.ProjectSearchQuery;
import com.kpz.codereview.azureclient.model.base.wrapper.TeamSearchQuery;
import com.kpz.codereview.azureclient.model.domain.ProjectSummary;
import com.kpz.codereview.azureclient.model.domain.UnassignedReview;

import java.text.ParseException;
import java.util.List;
import java.util.Set;

public interface AzureClientService {

    Set<String> getAllUsersFromOrg() throws JsonProcessingException;

    UnassignedReview getUnassignedReviewById(int id, String projectName) throws JsonProcessingException;

    List<WorkItem> getCodeReviewItemList(String projectName) throws JsonProcessingException;

    List<WorkItem> getWorkItemListFromQuery(String query, String projectName) throws JsonProcessingException;

    String extractQueryFromBody(String requestBody);

    ProjectSearchQuery getProjectList() throws JsonProcessingException;

    TeamSearchQuery getTeamList(String projectId) throws JsonProcessingException;

    MemberSearchQuery getMemberList(String projectId, String teamId) throws JsonProcessingException;

    List<ProjectSummary> getUserProjectSummaries(String userUUID) throws JsonProcessingException;

    void assignCodeReviewToUser(Integer workItemId, String userUUID, String projectName) throws JsonProcessingException;

    List<String> getUserProjects(String userUUID) throws JsonProcessingException;

    Set<CodeReviewerDTS> getProjectSortedReviewers(String projectName, String startDate, String endDate) throws JsonProcessingException;

    Set<CodeReviewerStatDTS> getReviewersStatistics(String projectName, String startDate, String endDate) throws JsonProcessingException, ParseException;
}