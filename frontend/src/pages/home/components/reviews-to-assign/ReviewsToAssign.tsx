import * as React from "react";
import styles from "./ReviewsToAssign.module.scss";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { ReviewToAssignComponent } from "./components/ReviewToAssignComponent";
import { IReviewsToAssignProps } from "./IReviewsToAssignProps";

export const ReviewsToAssign = ({
  usassignedReviews,
}: IReviewsToAssignProps) => {
  const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);

  const getData = () => {
    return usassignedReviews.map((review, key) => (
      <ReviewToAssignComponent review={review} key={key} />
    ));
  };

  return (
    <Box className={styles.container} __css={primaryStyles}>
      <div className={styles.header}>Reviews to assign</div>
      <div className={styles.reviewContainer}>{getData()}</div>
    </Box>
  );
};
