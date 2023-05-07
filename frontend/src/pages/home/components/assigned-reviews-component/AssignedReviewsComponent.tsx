import React from "react";
import styles from "./AssignedReviewsComponent.module.scss";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { AssignedReviewInfo } from "../../../../components/assigned-review-info/AssignedReviewInfo";
import { IAssignedReviewsComponentProps } from "./IAssignedReviewsComponent";

export const AssignedReviewsComponent = ({
  assignedReviews,
}: IAssignedReviewsComponentProps) => {
  const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);
  const secondaryStyles = useStyleConfig(StyledComponents.SecondaryComponent);

  const getData = () => {
    return assignedReviews.map((review) => (
      <AssignedReviewInfo {...review} style={secondaryStyles} key={review.id} />
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
