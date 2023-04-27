import * as React from "react";
import styles from "./WorkItems.module.scss";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { WorkItemComponent } from "./components/WorkItemComponent";
import { IWorkItemsProps } from "./IWorkItemsProps";


export const WorkItems = ({ usassignedReviews }: IWorkItemsProps) => {
  const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);

  const getData = () => {
    return usassignedReviews.map((review, key) => (
      <WorkItemComponent
        title={review.title}
        createdDate={review.createdDate}
        tags={review.tags}
        project={review.project}
        key={key}
      />
    ));
  };

  return (
    <Box className={styles.container} __css={primaryStyles}>
      <div className={styles.header}>Reviews to assign</div>
      <div className={styles.reviewContainer}>{getData()}</div>
    </Box>
  );
};
