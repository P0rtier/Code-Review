package com.kpz.codereview.azureclient.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kpz.codereview.auth.service.JwtService;
import com.kpz.codereview.azureclient.model.domain.base.Member;
import com.kpz.codereview.azureclient.model.domain.base.Project;
import com.kpz.codereview.azureclient.model.domain.base.Team;
import com.kpz.codereview.azureclient.model.azure.wrapper.WorkItem;
import com.kpz.codereview.azureclient.model.domain.dts.CodeReviewerDTS;
import com.kpz.codereview.azureclient.model.domain.dts.CodeReviewerStatDTS;
import com.kpz.codereview.azureclient.model.domain.dts.ProjectSummaryDTS;
import com.kpz.codereview.azureclient.model.domain.dts.UnassignedReviewDTS;
import com.kpz.codereview.azureclient.service.AzureClientService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestHeader;

import java.text.ParseException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/azure")
public class AzureClientController {
    private final AzureClientService azureService;
    private final JwtService jwtService;

    @Autowired
    public AzureClientController(AzureClientService azureService, JwtService jwtService) {
        this.azureService = azureService;
        this.jwtService = jwtService;
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
    @GetMapping("/work-items/{id}")
    public UnassignedReviewDTS getWorkItemById(@PathVariable int id) throws JsonProcessingException {
        return azureService.getUnassignedReviewById(id);
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
    @GetMapping("/work-items/reviews")
    public List<WorkItem> getReviewWorkItems(@RequestParam(name = "project") String projectName) throws JsonProcessingException {
        return azureService.getCodeReviewItemList(projectName);
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
    @GetMapping("/work-items/reviews/user")
    public List<ProjectSummaryDTS> getUserReviews(@RequestHeader(name = "Authorization") String token) throws JsonProcessingException {
        var userUUID = jwtService.getSubjectWithoutPrefix(token);

        return azureService.getUserProjectSummaries(userUUID);
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
    @GetMapping("/work-items/query")
    public List<WorkItem> getWorkItemList(@RequestBody String jsonQuery,
                                          @RequestParam(name = "project") String projectName) throws JsonProcessingException {
        var query = azureService.extractQueryFromBody(jsonQuery);
        return azureService.getWorkItemListFromQuery(query, projectName);
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
    public List<Project> getAllProjects() throws JsonProcessingException {
        return azureService.getProjectList();
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
    public List<Team> getProjectTeamList(@RequestParam(name = "project") String projectId) throws JsonProcessingException {
        return azureService.getTeamList(projectId);
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
    public List<Member> getTeamUserList(@RequestParam(name = "project") String projectId,
                                        @RequestParam(name = "team") String teamId) throws JsonProcessingException {
        return azureService.getMemberList(projectId, teamId);
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

    @PutMapping("/reviewer/{reviewId}")
    public void updateReviewer(@RequestParam(name = "email") String reviewerEmail, @PathVariable Integer reviewId,
                               @RequestParam(name = "project") String projectName) throws JsonProcessingException {
        azureService.assignCodeReviewToUser(reviewId, reviewerEmail, projectName);
    }


    @GetMapping("/review-sorted-users")
    public Set<CodeReviewerDTS> getSortedProjectReviewers(@RequestParam(name = "project") String projectName,
                                                          @RequestParam(name = "startDate") String startDate,
                                                          @RequestParam(name = "endDate") String endDate) throws JsonProcessingException {
        return azureService.getProjectSortedReviewers(projectName, startDate, endDate);
    }

    @GetMapping("/review-statistics")
    @Cacheable(value = "reviewStats", key = "{#projectName, #startDate, #endDate}")
    public Set<CodeReviewerStatDTS> getReviewersStatistics(@RequestParam(name = "project") String projectName,
                                                           @RequestParam(name = "startDate") String startDate,
                                                           @RequestParam(name = "endDate") String endDate) throws JsonProcessingException, ParseException {
        return azureService.getReviewersStatistics(projectName, startDate, endDate);
    }
}