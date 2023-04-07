import * as React from "react";
import styles from "./WorkItems.module.scss";
import { IRequestedReview } from "../../../../common/interfaces/IRequestedReview";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { WorkItemComponent } from "./components/WorkItemComponent";

const mockData: IRequestedReview[] = [
  {
    id: "1",
    header: "Work item #1",
    activityDate: new Date("25/03/2023"),
    state: "In progress",
    tags: ["frontend"],
  },
  {
    id: "2",
    header: "Work item #2",
    activityDate: new Date("25/03/2023"),
    state: "In progress",
    tags: ["frontend"],
  },
  {
    id: "3",
    header: "Work item #3",
    activityDate: new Date("25/03/2023"),
    state: "In progress",
    tags: ["frontend"],
  },
];

export const WorkItems = () => {
  const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);

  const getData = () => {
    return mockData.map((review, key) => (
      <WorkItemComponent
        header={review.header}
        activityDate={review.activityDate}
        state={review.state}
        tags={review.tags}
        key={key}
      />
    ));
  };

  return (
    <Box className={styles.container} __css={primaryStyles}>
      <div className={styles.header}>Work items</div>
      <div className={styles.reviewContainer}>{getData()}</div>
    </Box>
  );
};
