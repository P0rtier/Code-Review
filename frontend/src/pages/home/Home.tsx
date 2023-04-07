import React from "react";
import { WelcomeComponent } from "./components/welcome-component/WelcomeComponent";
import { ScheduledReviewsComponent } from "./components/scheduled-reviews-component/ScheduledReviewsComponent";
import { PageWrapper } from "../../components/page-wrapper/PageWrapper";
import { WorkItems } from "./components/work-items/WorkItems";

export const Home = () => {
  return (
    <PageWrapper>
      <WelcomeComponent />
      <WorkItems />
      <ScheduledReviewsComponent />
    </PageWrapper>
  );
};
