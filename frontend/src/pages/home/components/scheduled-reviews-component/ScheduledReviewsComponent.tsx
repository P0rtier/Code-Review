import React from "react";
import styles from "./ScheduledReviewsComponent.module.scss";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { ReviewInfo } from "../../../../components/review-info/ReviewInfo";
import { IScheduledReviewsComponentProps } from "./IScheduledReviewsComponent";


export const ScheduledReviewsComponent = ({ assignedReviews }: IScheduledReviewsComponentProps) => {
  const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);
  const secondaryStyles = useStyleConfig(StyledComponents.SecondaryComponent);

  const getData = () => {
    return assignedReviews.map((review) => (
      <ReviewInfo
        title={review.title}
        scheduledBy={review.scheduledByName}
        createdDate={review.createdDate.toLocaleDateString()}
        project={review.project}
        style={secondaryStyles}
        tags={review.tags}
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
