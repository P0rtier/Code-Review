package com.kpz.codereview.azureclient.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kpz.codereview.azureclient.model.domain.base.Member;
import com.kpz.codereview.azureclient.model.domain.base.Project;
import com.kpz.codereview.azureclient.model.domain.base.Team;
import com.kpz.codereview.azureclient.model.azure.wrapper.WorkItem;
import com.kpz.codereview.azureclient.model.domain.dts.CodeReviewerStatDTS;
import com.kpz.codereview.azureclient.model.domain.dts.CodeReviewerDTS;
import com.kpz.codereview.azureclient.model.domain.dts.ProjectSummaryDTS;
import com.kpz.codereview.azureclient.model.domain.dts.UnassignedReviewDTS;

import java.text.ParseException;
import java.util.List;
import java.util.Set;

public interface AzureClientService {

    Set<String> getAllUsersFromOrg() throws JsonProcessingException;

    UnassignedReviewDTS getUnassignedReviewById(int id) throws JsonProcessingException;

    List<WorkItem> getCodeReviewItemList(String projectName) throws JsonProcessingException;

    List<WorkItem> getWorkItemListFromQuery(String query, String projectName) throws JsonProcessingException;

    String extractQueryFromBody(String requestBody);

    List<Project> getProjectList() throws JsonProcessingException;

    List<Team> getTeamList(String projectId) throws JsonProcessingException;

    List<Member> getMemberList(String projectId, String teamId) throws JsonProcessingException;

    List<ProjectSummaryDTS> getUserProjectSummaries(String userUUID) throws JsonProcessingException;

    void assignCodeReviewToUser(Integer workItemId, String userUUID, String projectName) throws JsonProcessingException;

    Set<String> getUserProjects(String userUUID) throws JsonProcessingException;

    Set<CodeReviewerDTS> getProjectSortedReviewers(String projectName, String startDate, String endDate) throws JsonProcessingException;

    Set<CodeReviewerStatDTS> getReviewersStatistics(String projectName, String startDate, String endDate) throws JsonProcessingException, ParseException;
}