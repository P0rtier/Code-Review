import * as React from "react";
import styles from "./UnassignedReviewList.module.scss";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { UnassignedReviewItem } from "./components/unassigned-review-item/UnassignedReviewItem";
import { IUnassignedReviewListProps } from "./IUnassignedReviewListProps";


export const UnassignedReviewList = ({ unassignedReviews }: IUnassignedReviewListProps) => {
  const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);

  const getData = () => {
    return unassignedReviews.map((review, key) => (
      <UnassignedReviewItem
        review={review}
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
