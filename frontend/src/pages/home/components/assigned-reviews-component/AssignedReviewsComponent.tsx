import React from "react";
import styles from "./AssignedReviewsComponent.module.scss";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { AssignedReviewInfo } from "../../../../components/assigned-review-info/AssignedReviewInfo";
import { IAssignedReviewsComponentProps } from "./IAssignedReviewsComponent";
import { NoDataComponent } from "../../../../components/no-data-component/NoDataComponent";

export const AssignedReviewsComponent = ({
  assignedReviews,
}: IAssignedReviewsComponentProps) => {
  const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);
  const secondaryStyles = useStyleConfig(StyledComponents.SecondaryComponent);

  const getData = () => {
    if (assignedReviews.length === 0) {
      return <NoDataComponent header={"There are no assigned reviews."} />;
    }

    return assignedReviews.map((review) => (
      <AssignedReviewInfo {...review} style={secondaryStyles} key={review.id} />
    ));
  };

  return (
    <Box className={styles.container} __css={primaryStyles}>
      <div className={styles.header}>Assigned reviews</div>
      <div className={styles.reviewContainer}>{getData()}</div>
    </Box>
  );
};
