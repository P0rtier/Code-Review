import React from "react";
import styles from "./ScheduledReviewList.module.scss";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { ScheduledReviewItem } from "./components/scheduled-review-item/ScheduledReviewItem";
import { IScheduledReviewListProps } from "./IScheduledReviewList";


export const ScheduledReviewList = ({ assignedReviews }: IScheduledReviewListProps) => {
  const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);
  const secondaryStyles = useStyleConfig(StyledComponents.SecondaryComponent);

  const getData = () => {
    return assignedReviews.map((review) => (
      <ScheduledReviewItem
        {...review}
        style={secondaryStyles}
        key={review.id}
      />
    ));
  };

  return (
    <div className={styles.container}>
      <Box className={styles.colorPanel} __css={primaryStyles}></Box>
      <div className={styles.wrapper}>
        <div className={styles.header}>Assigned reviews</div>
        <div className={styles.reviewContainer}>{getData()}</div>
      </div>
    </div>
  );
};
