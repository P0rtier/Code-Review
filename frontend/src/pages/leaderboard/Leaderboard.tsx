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
    const projectId = new URLSearchParams(search).get('project');
    const [projects, setProjects] = React.useState<IProjectNameState[]>();
    const [userStandings, setUserStandings] = React.useState<IUserStanding[]>();
    const [projectsLoading, setProjectsLoading] = React.useState<boolean>(true);
    const [leaderboardLoading, setLeaderboardLoading] = React.useState<boolean>(false);

    const getCurrentProjectName = () => {
        if (projects) {
            return (projects.find((project) => project.id === projectId)?.name)
        }
    }


    React.useEffect(() => {
        agent.Projects.getNames().then((response: IProjectNameState[]) => {
            setProjects(response);
            setProjectsLoading(false);
        });
        if (projectId) {
            setLeaderboardLoading(true);
            agent.Leaderboard.getUserStandings(projectId).then((response: IProjectLeaderboard) => {
                setUserStandings(response.userStandings);
                setLeaderboardLoading(false);
            });
        }
    }, [projectId]);

    const getProjectNames = () => {
        if (projects) {
            return (projects.map((project) => project.name));
        };
    };

    const getProjectId = (projectName: string) => {
        if (projects) {
            return (projects.find((project) => project.name === projectName)?.id)
        }
    }

    const selectProject = (projectName: string) => {
        let newProjectId = getProjectId(projectName);

        if (newProjectId !== projectId) {
            navigate(`/leaderboard?project=${newProjectId}`)
            if (newProjectId) {
                setLeaderboardLoading(true);
                agent.Leaderboard.getUserStandings(newProjectId).then((response: IProjectLeaderboard) => {
                    setUserStandings(response.userStandings);
                    setLeaderboardLoading(false);
                });
            };
        }
    }

    const getUserStandings = () => {
        if (userStandings) {
            return (userStandings.map((userStanding) =>
                <UserStandingItem userStanding={userStanding} key={userStanding.id} />
            ));
        };
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
                    <div>
                        {leaderboardLoading ? (
                            <Placeholder header={"Loading leaderboard..."} />
                        ) : (
                            getUserStandings())}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}