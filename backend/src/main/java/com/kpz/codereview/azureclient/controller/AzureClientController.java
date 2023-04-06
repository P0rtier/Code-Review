package com.kpz.codereview.azureclient.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kpz.codereview.azureclient.model.wrapper.MemberSearchQuery;
import com.kpz.codereview.azureclient.model.wrapper.ProjectSearchQuery;
import com.kpz.codereview.azureclient.model.wrapper.TeamSearchQuery;
import com.kpz.codereview.azureclient.model.WorkItem;
import com.kpz.codereview.azureclient.service.AzureClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/azure")
public class AzureClientController {
    @Autowired
    private AzureClientService service;

    @GetMapping("/work-items/{id}")
    public WorkItem getWorkItemById(@PathVariable int id,
                                    @RequestParam(name = "project") String projectName) throws JsonProcessingException {
        return service.getWorkItemById(id, projectName);
    }

    @GetMapping("/work-items/review")
    public List<WorkItem> getReviewWorkItems(@RequestParam(name = "project") String projectName) throws JsonProcessingException {
        return service.getCodeReviewItemList(projectName);
    }

    @GetMapping("/work-items")
    public List<WorkItem> getWorkItemList(@RequestBody String jsonQuery,
                                          @RequestParam(name = "project") String projectName) throws JsonProcessingException {
        var query = service.extractQueryFromBody(jsonQuery);
        return service.getWorkItemListFromQuery(query, projectName);
    }

    @GetMapping("/projects")
    public ProjectSearchQuery getOrgProjectList() throws JsonProcessingException {
        return service.getProjectList();
    }

    @GetMapping("/teams")
    public TeamSearchQuery getProjectTeamList(@RequestParam(name = "project")  String projectId) throws JsonProcessingException {
        return service.getTeamList(projectId);
    }

    @GetMapping("/members")
    public MemberSearchQuery getProjectUserList(@RequestParam(name = "project") String projectId,
                                                @RequestParam(name = "team") String teamId) throws JsonProcessingException {
        return service.getMemberList(projectId, teamId);
    }

    @GetMapping("/work-items/review/assigned")
    public List<WorkItem> getReviewWorkItems(@RequestParam(name = "project") String projectName,
                                             @RequestParam(name = "user") String userEmail ) throws JsonProcessingException {
        return service.getAssignedCodeReviewItemsByUser(userEmail, projectName);
    }
}
