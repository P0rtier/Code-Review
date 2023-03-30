package com.kpz.codereview.client.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kpz.codereview.client.model.wrapper.MemberSearchQuery;
import com.kpz.codereview.client.model.wrapper.ProjectSearchQuery;
import com.kpz.codereview.client.model.wrapper.TeamSearchQuery;
import com.kpz.codereview.client.model.WorkItem;

import java.util.List;

public interface AzureClientService {

    WorkItem getWorkItemById(int id, String projectName) throws JsonProcessingException;

    List<WorkItem> getCodeReviewItemList(String projectName) throws JsonProcessingException;

    List<WorkItem> getWorkItemListFromQuery(String query, String projectName) throws JsonProcessingException;

    String extractQueryFromBody(String requestBody);

    ProjectSearchQuery getProjectList() throws JsonProcessingException;

    TeamSearchQuery getTeamList(String projectId) throws JsonProcessingException;

    MemberSearchQuery getMemberList(String projectId, String teamId) throws JsonProcessingException;
}