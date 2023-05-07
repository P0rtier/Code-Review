import React from "react";
import { IReviewToAssignComponentProps } from "./IReviewToAssignComponentProps";
import styles from "./ReviewToAssignComponent.module.scss";
import { BoldRegularText } from "../../../../../components/bold-regular-text/BoldRegularText";
import { Link } from "react-router-dom";

export const ReviewToAssignComponent = (
  props: IReviewToAssignComponentProps
) => {
  const review = props.review;

  return (
    <Link to={"/reviewer"} state={{ review: review }}>
      <div className={styles.review}>
        <BoldRegularText boldText={"Title: "} regularText={review.title} />
        <BoldRegularText boldText={"Project: "} regularText={review.project} />
        <BoldRegularText
          boldText={"Created date: "}
          regularText={review.createdDate.toLocaleDateString()}
        />
        <BoldRegularText
          boldText={"Tags: "}
          regularText={String(review.tags)}
        />
      </div>
    </Link>
  );
};
