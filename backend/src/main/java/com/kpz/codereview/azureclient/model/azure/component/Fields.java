package com.kpz.codereview.azureclient.model.azure.component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Fields {
    @JsonProperty("System.TeamProject")
    public String TeamProject;
    @JsonProperty("System.WorkItemType")
    public String WorkItemType;
    @JsonProperty("System.State")
    public String State;
    @JsonProperty("System.Reason")
    public String Reason;
    @JsonProperty("System.AssignedTo")
    public SystemAssignedTo AssignedTo;
    @JsonProperty("System.CreatedDate")
    public Date createdDate;
    @JsonProperty("System.CreatedBy")
    public SystemCreatedBy createdBy;
    @JsonProperty("System.ChangedDate")
    public Date changedDate;
    @JsonProperty("System.CommentCount")
    public int commentCount;
    @JsonProperty("System.Title")
    public String title;
    @JsonProperty("Microsoft.VSTS.Common.StateChangeDate")
    public Date stateChangeDate;
    @JsonProperty("Microsoft.VSTS.Common.Priority")
    public int priority;
    @JsonProperty("Microsoft.VSTS.Common.ValueArea")
    public String valueArea;
    @JsonProperty("WEF_75A109C1CA20451697EEAF1B452D5A56_Kanban.Column")
    public String column;
    @JsonProperty("System.Description")
    public String description;
    @JsonProperty("Microsoft.VSTS.Common.AcceptanceCriteria")
    public String acceptanceCriteria;
    @JsonProperty("System.Tags")
    public String tags;
}
