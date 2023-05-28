import React, { useCallback } from "react";
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
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { StatusCodes } from "../../common/enums/StatusCodes";
import { NoDataComponent } from "../../components/no-data-component/NoDataComponent";

export const Leaderboard = () => {
  const secondaryComponent = useStyleConfig(StyledComponents.PrimaryComponent);

  const navigate = useNavigate();
  const search = useLocation().search;
  const projectId = new URLSearchParams(search).get("project");

  const [projects, setProjects] = React.useState<IProjectNameState[]>();
  const [userStandings, setUserStandings] = React.useState<IUserStanding[]>();
  const [projectsLoading, setProjectsLoading] = React.useState<boolean>(true);
  const [leaderboardLoading, setLeaderboardLoading] = React.useState<boolean>(false);

  const cachedHandleError = useCallback(handleError, []);
  const cachedGetLeaderboard = useCallback(getLeaderboard, [cachedHandleError]);

  React.useEffect(() => {
    agent.Projects.getNames().then((response: IProjectNameState[]) => {
      setProjects(response);
      setProjectsLoading(false);

      if (!projectId) {
        navigate(`/leaderboard?project=${response[0].id}`);
        cachedGetLeaderboard(response[0].id);
      }
    });


  }, [cachedGetLeaderboard, projectId, navigate]);

  React.useEffect(() => {
    cachedGetLeaderboard(projectId);
  }, [cachedGetLeaderboard, projectId]);

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

  function getLeaderboard(newProjectId: string | undefined | null) {
    setLeaderboardLoading(true);
    if (newProjectId) {

      agent.Leaderboard.getUserStandings(newProjectId).then(
        (response: IProjectLeaderboard) => {
          setUserStandings(response.userStandings.sort(
            (a, b) => a.place - b.place
          ));
        })
        .catch(cachedHandleError)
        .finally(() => {
          setLeaderboardLoading(false);
        });
    }

  };

  function handleError(error: AxiosError) {
    if (!error.response) {
      toast.error("Unexpected error occured.");
      return;
    }

    const { status } = error.response;

    if (status === StatusCodes.NotFound) {
      toast.error("Leaderboard for this project does not exist.");
    } else {
      toast.error("Unexpected error occured.");
    }
  };

  const selectProject = (projectName: string) => {
    let newProjectId = getProjectId(projectName);

    if (newProjectId && newProjectId !== projectId) {
      navigate(`/leaderboard?project=${newProjectId}`);
      getLeaderboard(newProjectId);
    }
  };

  const getUserStandings = () => {
    if (userStandings) {
      return userStandings.map((userStanding) => (
        <UserStandingItem userStanding={userStanding} key={userStanding.id} />
      ));
    } else {
      return (
        <Box className={styles.noDataContainer} __css={secondaryComponent}>
          <NoDataComponent header="There is no leaderboard to be shown." />
        </Box>);
    }
  };

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
          {leaderboardLoading ? (
            <Placeholder header={""} />
          ) : (
            getUserStandings()
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
