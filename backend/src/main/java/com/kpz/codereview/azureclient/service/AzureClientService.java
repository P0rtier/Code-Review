package com.kpz.codereview.azureclient.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kpz.codereview.azureclient.model.WorkItem;
import com.kpz.codereview.azureclient.model.component.AvailabilityPeriod;
import com.kpz.codereview.azureclient.model.component.CodeReviewerDTS;
import com.kpz.codereview.azureclient.model.wrapper.MemberSearchQuery;
import com.kpz.codereview.azureclient.model.wrapper.ProjectSearchQuery;
import com.kpz.codereview.azureclient.model.wrapper.TeamSearchQuery;

import java.util.List;
import java.util.Set;

public interface AzureClientService {

    Set<String> getAllUsersFromOrg() throws JsonProcessingException;

    WorkItem getWorkItemById(int id, String projectName) throws JsonProcessingException;

    List<WorkItem> getCodeReviewItemList(String projectName) throws JsonProcessingException;

    List<WorkItem> getUnassignedCodeReviewItemsByUser(String userEmail, String projectName) throws JsonProcessingException;

    List<WorkItem> getWorkItemListFromQuery(String query, String projectName) throws JsonProcessingException;

    String extractQueryFromBody(String requestBody);

    ProjectSearchQuery getProjectList() throws JsonProcessingException;

    TeamSearchQuery getTeamList(String projectId) throws JsonProcessingException;

    MemberSearchQuery getMemberList(String projectId, String teamId) throws JsonProcessingException;

    List<WorkItem> getAssignedCodeReviewItemsByUser(String userEmail, String projectName) throws JsonProcessingException;
    Set<CodeReviewerDTS> getProjectSortedReviewers(String projectName, AvailabilityPeriod availabilityPeriod) throws JsonProcessingException;
}