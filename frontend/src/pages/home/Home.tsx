import React from "react";
import { WelcomeComponent } from "./components/welcome-component/WelcomeComponent";
import { RequestedReviewsComponent } from "./components/requested-reviews-component/RequestedReviewsComponent";
import { ScheduledReviewsComponent } from "./components/scheduled-reviews-component/ScheduledReviewsComponent";
import { PageWrapper } from "../../components/page-wrapper/PageWrapper";

export const Home = () => {
  return (
    <PageWrapper>
      <WelcomeComponent />
      <RequestedReviewsComponent />
      <ScheduledReviewsComponent />
    </PageWrapper>
  );
};
