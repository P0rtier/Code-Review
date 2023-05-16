import React from "react";
import { IReviewToAssignComponentProps } from "./IReviewToAssignComponentProps";
import styles from "./ReviewToAssignComponent.module.scss";
import { BoldRegularText } from "../../../../../components/bold-regular-text/BoldRegularText";
import { Link } from "react-router-dom";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../../common/enums/StyledComponents";

export const ReviewToAssignComponent = (
  props: IReviewToAssignComponentProps
) => {
  const secondaryStyles = useStyleConfig(StyledComponents.SecondaryComponent);
  const review = props.review;
  const tags = review.tags.length > 0 ? String(review.tags) : "-";

  return (
    <Link
      className={styles.reviewLink}
      to={"/reviewer"}
      state={{ review: review }}
    >
      <Box className={styles.review} __css={secondaryStyles}>
        <BoldRegularText boldText={"Title: "} regularText={review.title} />
        <BoldRegularText
          boldText={"Created date: "}
          regularText={review.createdDate.toLocaleDateString()}
        />
        <BoldRegularText boldText={"Tags: "} regularText={tags} />
      </Box>
    </Link>
  );
};
