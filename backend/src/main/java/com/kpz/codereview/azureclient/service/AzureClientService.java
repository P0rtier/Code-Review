package com.kpz.codereview.azureclient.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kpz.codereview.azureclient.model.wrapper.MemberSearchQuery;
import com.kpz.codereview.azureclient.model.wrapper.ProjectSearchQuery;
import com.kpz.codereview.azureclient.model.wrapper.TeamSearchQuery;
import com.kpz.codereview.azureclient.model.WorkItem;

import java.util.List;

public interface AzureClientService {

    WorkItem getWorkItemById(int id, String projectName) throws JsonProcessingException;

    List<WorkItem> getCodeReviewItemList(String projectName) throws JsonProcessingException;

    List<WorkItem> getUnassignedCodeReviewItemsByUser(String userEmail, String projectName) throws JsonProcessingException;

    List<WorkItem> getWorkItemListFromQuery(String query, String projectName) throws JsonProcessingException;

    String extractQueryFromBody(String requestBody);

    ProjectSearchQuery getProjectList() throws JsonProcessingException;

    TeamSearchQuery getTeamList(String projectId) throws JsonProcessingException;

    MemberSearchQuery getMemberList(String projectId, String teamId) throws JsonProcessingException;

    List<WorkItem> getAssignedCodeReviewItemsByUser(String userEmail, String projectName) throws JsonProcessingException;
}