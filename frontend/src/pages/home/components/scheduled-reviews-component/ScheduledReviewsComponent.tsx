import React from "react";
import styles from "./ScheduledReviewsComponent.module.scss";
import IScheduledReview from "../../../../common/interfaces/IScheduledReview";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { ReviewInfo } from "../../../../components/review-info/ReviewInfo";

const mockData: IScheduledReview[] = [
  {
    id: "1",
    title: "Review #1",
    scheduledTo: "Name Surname",
    scheduled: new Date("25/03/2023"),
    team: "Team",
    pullRequest: "info",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut felis eget nisl finibus ultrices sed eget dui. Proin a purus leo.",
  },
  {
    id: "2",
    title: "Review #2",
    scheduledTo: "Name Surname",
    scheduled: new Date("25/03/2023"),
    team: "Team",
    pullRequest: "info",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut felis eget nisl finibus ultrices sed eget dui. Proin a purus leo.",
  },
  {
    id: "3",
    title: "Review #3",
    scheduledTo: "Name Surname",
    scheduled: new Date("25/03/2023"),
    team: "Team",
    pullRequest: "info",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut felis eget nisl finibus ultrices sed eget dui. Proin a purus leo.",
  },
];

export const ScheduledReviewsComponent = () => {
  const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);
  const secondaryStyles = useStyleConfig(StyledComponents.SecondaryComponent);

  const getData = () => {
    return mockData.map((review) => (
      <ReviewInfo
        header={review.title}
        scheduledTo={review.scheduledTo}
        scheduled={review.scheduled.toLocaleDateString()}
        team={review.team}
        pullRequest={review.pullRequest}
        description={review.description}
        style={secondaryStyles}
        key={review.id}
      />
    ));
  };

  return (
    <div className={styles.container}>
      <Box className={styles.colorPanel} __css={primaryStyles}></Box>
      <div className={styles.wrapper}>
        <div className={styles.header}>Scheduled reviews</div>
        <div className={styles.reviewContainer}>{getData()}</div>
      </div>
    </div>
  );
};
