import * as React from "react";
import styles from "./ReviewsToAssign.module.scss";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { ReviewToAssignComponent } from "./components/ReviewToAssignComponent";
import { IReviewsToAssignProps } from "./IReviewsToAssignProps";
import { joinClasses } from "../../../../common/utils/joinClasses";
import { useEffect } from "react";
import { NoDataComponent } from "../../../../components/no-data-component/NoDataComponent";

export const ReviewsToAssign = ({
  unassignedReviews,
}: IReviewsToAssignProps) => {
  const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);

  const [noReviews, setNoReviews] = React.useState<boolean>(false);

  useEffect(() => {
    if (unassignedReviews.length === 0) {
      setNoReviews(true);
    } else {
      setNoReviews(false);
    }
  }, [unassignedReviews]);

  const getData = () => {
    if (noReviews) {
      return <NoDataComponent header={"There are no reviews to assign."} />;
    }

    return unassignedReviews.map((review, key) => (
      <ReviewToAssignComponent review={review} key={key} />
    ));
  };

  return (
    <Box className={styles.container} __css={primaryStyles}>
      <div className={styles.header}>Reviews to assign</div>
      <div
        className={
          noReviews
            ? joinClasses(styles.reviewContainer, styles.alignCenter)
            : styles.reviewContainer
        }
      >
        {getData()}
      </div>
    </Box>
  );
};
