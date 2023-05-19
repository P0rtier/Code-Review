import React from "react";
import styles from "./Leaderboard.module.scss";
import { PageWrapper } from "../../components/page-wrapper/PageWrapper";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../common/enums/StyledComponents";
import { IProjectNameState } from "../../common/interfaces/IProjectNameState";
import agent from "../../common/api/agent";
import { useLocation, useNavigate } from "react-router-dom";
import { IProjectLeaderboard } from "../../common/interfaces/IProjectLeaderboard";
import { IUserStanding } from "../../common/interfaces/IUserStanding";
import { LeaderboardTopbar } from "./components/leaderboard-topbar/LeaderboardTopbar";
import { UserStandingItem } from "./components/user-standing-item/UserStandingItem";
import { ProjectDropdown } from "../../components/project-dropdown/ProjectDropdown";
import { DropdownPlaceholder } from "../../components/placeholders/dropdown-placeholder/DropdownPlaceholder";
import { Placeholder } from "../../components/placeholders/placeholder/Placeholder";

export const Leaderboard = () => {
  const secondaryComponent = useStyleConfig(StyledComponents.PrimaryComponent);

  const navigate = useNavigate();
  const search = useLocation().search;
  const projectId = new URLSearchParams(search).get("project");

  // #region States

  const [projects, setProjects] = React.useState<IProjectNameState[]>();
  const [userStandings, setUserStandings] = React.useState<IUserStanding[]>();
  const [projectsLoading, setProjectsLoading] = React.useState<boolean>(true);
  const [leaderboardLoading, setLeaderboardLoading] = React.useState<boolean>(false);

  // #endregion States

  // #region Effects
  React.useEffect(() => {
    agent.Projects.getNames().then((response: IProjectNameState[]) => {
      setProjects(response);
      setProjectsLoading(false);

      if (!projectId) {
        getLeaderbord(response[0].id);
      }
    });


  }, []);

  React.useEffect(() => {
    getLeaderbord(projectId, true);
  }, [projectId]);
  // #endregion Effects

  // #region Functions
  const getCurrentProjectName = () => {
    if (projects) {
      return projects.find((project) => project.id === projectId)?.name;
    }
  };

  const getProjectNames = () => {
    if (projects) {
      return projects.map((project) => project.name);
    }
  };

  const getProjectId = (projectName: string) => {
    if (projects) {
      return projects.find((project) => project.name === projectName)?.id;
    }
  };

  const getLeaderbord = (newProjectId: string | undefined | null, forceGet?: boolean) => {
    if ((newProjectId && newProjectId !== projectId) || forceGet) {
      navigate(`/leaderboard?project=${newProjectId}`);

      setLeaderboardLoading(true);
      if (newProjectId) {

        agent.Leaderboard.getUserStandings(newProjectId).then(
          (response: IProjectLeaderboard) => {
            setUserStandings(response.userStandings);
            setLeaderboardLoading(false);
          });

      };
    };
  };

  const selectProject = (projectName: string) => {
    let newProjectId = getProjectId(projectName);

    getLeaderbord(newProjectId);
  };

  const getUserStandings = () => {
    if (userStandings) {
      return userStandings.map((userStanding) => (
        <UserStandingItem userStanding={userStanding} key={userStanding.id} />
      ));
    }
  };

  // #endregion Functions

  return (
    <PageWrapper>
      <div className={styles.container}>
        <Box className={styles.projectSelector} __css={secondaryComponent}>
          <div className={styles.title}>Leaderboard</div>
          {projectsLoading ? (
            <DropdownPlaceholder header={"Loading projects..."} />
          ) : (
            <ProjectDropdown
              projectNames={getProjectNames()}
              selectProject={selectProject}
              selectedProject={getCurrentProjectName()}
            />
          )}
        </Box>
        <div className={styles.userStandingsContainer}>
          <LeaderboardTopbar />
          <div>
            {leaderboardLoading ? (
              <Placeholder header={""} />
            ) : (
              getUserStandings()
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
