import * as React from "react";
import styles from "./RequestedReviewsComponent.module.scss";
import { IRequestedReview } from "../../../../common/interfaces/IRequestedReview";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { RequestedReviewItem } from "./components/RequestedReviewItem";

const mockData: IRequestedReview[] = [
  {
    id: "1",
    header: "Review #1",
    scheduledTo: "Name Surname",
    scheduled: new Date("25/03/2023"),
    team: "Team",
    pullRequest: "info",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut felis eget nisl finibus ultrices sed eget dui. Proin a purus leo.",
  },
  {
    id: "2",
    header: "Review #2",
    scheduledTo: "Name Surname",
    scheduled: new Date("25/03/2023"),
    team: "Team",
    pullRequest: "info",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut felis eget nisl finibus ultrices sed eget dui. Proin a purus leo.",
  },
  {
    id: "3",
    header: "Review #3",
    scheduledTo: "Name Surname",
    scheduled: new Date("25/03/2023"),
    team: "Team",
    pullRequest: "info",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut felis eget nisl finibus ultrices sed eget dui. Proin a purus leo.",
  },
];

export const RequestedReviewsComponent = () => {
  const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);

  const getData = () => {
    return mockData.map((review) => (
      <RequestedReviewItem
        header={review.header}
        scheduledTo={review.scheduledTo}
        scheduled={review.scheduled}
        team={review.team}
        pullRequest={review.pullRequest}
        description={review.description}
        key={review.id}
      />
    ));
  };

  return (
    <Box className={styles.container} __css={primaryStyles}>
      <div className={styles.header}>Requested reviews</div>
      <div className={styles.reviewContainer}>{getData()}</div>
    </Box>
  );
};
