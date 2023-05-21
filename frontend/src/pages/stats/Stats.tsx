import React, { useEffect } from "react";
import styles from "./Stats.module.scss";
import { PageWrapper } from "../../components/page-wrapper/PageWrapper";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../common/enums/StyledComponents";
import { IStatsTeamMember } from "../../common/interfaces/IStatsTeamMember";
import { TeamSearchResult } from "./components/team-search-result/TeamSearchResult";
import { TeamGraphs } from "./components/team-graphs/TeamGraphs";
import agent from "../../common/api/agent";
import { ProjectDropdown } from "../../components/project-dropdown/ProjectDropdown";
import { DropdownPlaceholder } from "../../components/placeholders/dropdown-placeholder/DropdownPlaceholder";
import { StyledDatePicker } from "../../components/styled-date-picker/StyledDatePicker";
import { StateContext } from "../../common/providers/StatsProvider";
import { StatsActions } from "../../common/enums/StatsActions";
import { IDateContainer } from "../../common/interfaces/IDateContainer";
import { IProjectNameState } from "../../common/interfaces/IProjectNameState";
import { Placeholder } from "../../components/placeholders/placeholder/Placeholder";

export const Stats = () => {
  const { state, dispatch } = React.useContext(StateContext);
  const [loading, setLoading] = React.useState<boolean>(true);

  const attentionComponent = useStyleConfig(
    StyledComponents.AttentionComponent
  );

  useEffect(() => {
    agent.Projects.getNames().then((response: IProjectNameState[]) => {
      dispatch({ type: StatsActions.SetProjectList, payload: response });

      if (response.length > 0) {
        dispatch({ type: StatsActions.SetProject, payload: response[0] });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    if (state.currentProject) {
      agent.Stats.get(
        state.currentProject.name,
        state.currentDate.startDate,
        state.currentDate.endDate
      ).then((response: IStatsTeamMember[]) => {
        dispatch({ type: StatsActions.SetAllTeamMembers, payload: response });
        dispatch({
          type: StatsActions.SetReducedTeamMembers,
          payload: response,
        });
        setLoading(false);
      });
    }
  }, [state.currentProject, state.currentDate, dispatch]);

  const handleSelectProject = (projectName: string) => {
    dispatch({
      type: StatsActions.SetProject,
      payload: state.projectList.find(
        (project) => project.name === projectName
      ),
    });
  };

  const handleDateChange = (date: IDateContainer) => {
    dispatch({ type: StatsActions.SetCurrentDate, payload: date });
  };

  return (
    <PageWrapper smallGap={true}>
      <div className={styles.container}>
        <div className={styles.topWrapper}>
          <Box className={styles.teamSelector} __css={attentionComponent}>
            <div className={styles.title}>Project stats</div>
            {loading ? (
              <DropdownPlaceholder header={"Loading projects..."} />
            ) : (
              <ProjectDropdown
                projectNames={state.projectList.map((project) => project.name)}
                selectedProject={state.currentProject?.name}
                selectProject={handleSelectProject}
              />
            )}
            <StyledDatePicker setCurrentDate={handleDateChange} />
          </Box>
          {loading ? (
            <div style={{ height: "30rem", width: "100%" }}>
              <Placeholder header={""} fullHeight={true} />
            </div>
          ) : (
            <TeamSearchResult teamMembers={state.allTeamMembers} />
          )}
        </div>
        <TeamGraphs teamMembers={state.reducedTeamMembers} loading={loading} />
      </div>
    </PageWrapper>
  );
};
