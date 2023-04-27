import React, { useEffect } from "react";
import { WelcomeComponent } from "./components/welcome-component/WelcomeComponent";
import { ScheduledReviewsComponent } from "./components/scheduled-reviews-component/ScheduledReviewsComponent";
import { PageWrapper } from "../../components/page-wrapper/PageWrapper";
import { WorkItems } from "./components/work-items/WorkItems";
import { IProject } from "../../common/interfaces/IProject";
import agent from "../../common/api/agent";

export const Home = () => {
  const [projects, setProjects] = React.useState<IProject[]>([]);
  const [selectedProject, setSelectedProject] = React.useState<IProject>();

  useEffect(() => {
    agent.Reviews.getUser().then((response: IProject[]) => {
      setProjects(response);
      console.log(response);
    });
  }, []);

  const handleSelectProject = (projectName: string) => {
    setSelectedProject(projects.find((project) => project.name === projectName));
  }

  return (
    <PageWrapper>
      <WelcomeComponent
        projectNames={projects.map((project) => project.name)}
        selectedProject={selectedProject?.name}
        selectProject={handleSelectProject}
      />
      {selectedProject && <WorkItems usassignedReviews={selectedProject.unassignedReviews} />}
      {selectedProject && <ScheduledReviewsComponent assignedReviews={selectedProject.assignedReviews} />}
    </PageWrapper>
  );
};