import React, { useEffect } from "react";
import { WelcomeComponent } from "./components/welcome-component/WelcomeComponent";
import { AssignedReviewsComponent } from "./components/assigned-reviews-component/AssignedReviewsComponent";
import { PageWrapper } from "../../components/page-wrapper/PageWrapper";
import { ReviewsToAssign } from "./components/reviews-to-assign/ReviewsToAssign";
import { IProject } from "../../common/interfaces/IProject";
import agent from "../../common/api/agent";
import { Placeholder } from "./components/placeholder/Placeholder";

export const Home = () => {
  const [projects, setProjects] = React.useState<IProject[]>([]);
  const [selectedProject, setSelectedProject] = React.useState<IProject>();
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    agent.Reviews.getMine().then((response: IProject[]) => {
      setProjects(response);
      if (response.length > 0) {
        setSelectedProject(response[0]);
      }
      setLoading(false);
    });
  }, []);

  const handleSelectProject = (projectName: string) => {
    setSelectedProject(
      projects.find((project) => project.name === projectName)
    );
  };

  return (
    <PageWrapper>
      <WelcomeComponent
        projectNames={projects.map((project) => project.name)}
        selectedProject={selectedProject?.name}
        selectProject={handleSelectProject}
      />
      {loading ? (
        <>
          <Placeholder header={"Reviews to assign"} />
          <Placeholder header={"Assigned reviews"} />
        </>
      ) : (
        selectedProject && (
          <>
            <ReviewsToAssign
              usassignedReviews={selectedProject.unassignedReviews}
            />
            <AssignedReviewsComponent
              assignedReviews={selectedProject.assignedReviews}
            />
          </>
        )
      )}
    </PageWrapper>
  );
};
