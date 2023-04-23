package com.kpz.codereview.azureclient.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kpz.codereview.azureclient.model.WorkItem;
import com.kpz.codereview.azureclient.model.component.CodeReviewerDTS;
import com.kpz.codereview.azureclient.model.component.AvailabilityPeriod;
import com.kpz.codereview.azureclient.model.wrapper.MemberSearchQuery;
import com.kpz.codereview.azureclient.model.wrapper.ProjectSearchQuery;
import com.kpz.codereview.azureclient.model.wrapper.TeamSearchQuery;
import com.kpz.codereview.azureclient.service.AzureClientService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/azure")
public class AzureClientController {
    @Autowired
    private AzureClientService service;

    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "410",
                    description = "Azure API returned exception",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Cannot parse response from Azure API",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "User is not authorized",
                    content = @Content
            ),
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @GetMapping("/work-items/{id}")
    public WorkItem getWorkItemById(@PathVariable int id,
                                    @RequestParam(name = "project") String projectName) throws JsonProcessingException {
        return service.getWorkItemById(id, projectName);
    }

    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "410",
                    description = "Azure API returned exception",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Cannot parse response from Azure API",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "User is not authorized",
                    content = @Content
            ),
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @GetMapping("/work-items/review")
    public List<WorkItem> getReviewWorkItems(@RequestParam(name = "project") String projectName) throws JsonProcessingException {
        return service.getCodeReviewItemList(projectName);
    }

    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "410",
                    description = "Azure API returned exception",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Cannot parse response from Azure API",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "User is not authorized",
                    content = @Content
            ),
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @GetMapping("/work-items/review/unassigned")
    public List<WorkItem> getUnassignedReviewWorkItems(@RequestParam(name = "project") String projectName,
                                             @RequestParam(name = "user") String userEmail ) throws JsonProcessingException {
        return service.getUnassignedCodeReviewItemsByUser(userEmail, projectName);
    }

    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "410",
                    description = "Azure API returned exception",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Cannot parse response from Azure API",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "User is not authorized",
                    content = @Content
            ),
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @GetMapping("/work-items/review/assigned")
    public List<WorkItem> getAssignedReviewWorkItems(@RequestParam(name = "project") String projectName,
                                             @RequestParam(name = "user") String userEmail ) throws JsonProcessingException {
        return service.getAssignedCodeReviewItemsByUser(userEmail, projectName);
    }


    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "410",
                    description = "Azure API returned exception",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Field 'query' is missing",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Cannot parse response from Azure API",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "User is not authorized",
                    content = @Content
            ),
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @GetMapping("/work-items")
    public List<WorkItem> getWorkItemList(@RequestBody String jsonQuery,
                                          @RequestParam(name = "project") String projectName) throws JsonProcessingException {
        var query = service.extractQueryFromBody(jsonQuery);
        return service.getWorkItemListFromQuery(query, projectName);
    }

    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "410",
                    description = "Azure API returned exception",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Cannot parse response from Azure API",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "User is not authorized",
                    content = @Content
            ),
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @GetMapping("/projects")
    public ProjectSearchQuery getOrgProjectList() throws JsonProcessingException {
        return service.getProjectList();
    }

    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "410",
                    description = "Azure API returned exception",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Cannot parse response from Azure API",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "User is not authorized",
                    content = @Content
            ),
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @GetMapping("/teams")
    public TeamSearchQuery getProjectTeamList(@RequestParam(name = "project")  String projectId) throws JsonProcessingException {
        return service.getTeamList(projectId);
    }

    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "410",
                    description = "Azure API returned exception",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Cannot parse response from Azure API",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "User is not authorized",
                    content = @Content
            ),
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @GetMapping("/members")
    public MemberSearchQuery getProjectUserList(@RequestParam(name = "project") String projectId,
                                                @RequestParam(name = "team") String teamId) throws JsonProcessingException {
        return service.getMemberList(projectId, teamId);
    }

    @ApiResponses(value = {
        @ApiResponse(
                responseCode = "410",
                description = "Azure API returned exception",
                content = @Content
        ),
        @ApiResponse(
                responseCode = "500",
                description = "Cannot parse response from Azure API",
                content = @Content
        ),
        @ApiResponse(
                responseCode = "401",
                description = "User is not authorized",
                content = @Content
        ),
        @ApiResponse(responseCode = "200", description = "OK")
    })
    @GetMapping("/review-sorted-users")
    public Set<CodeReviewerDTS> getSortedProjectReviewers(@RequestParam(name = "project") String projectName,
                                                          @RequestBody AvailabilityPeriod availabilityPeriod) throws JsonProcessingException {
        return service.getProjectSortedReviewers(projectName, availabilityPeriod);
    }
}