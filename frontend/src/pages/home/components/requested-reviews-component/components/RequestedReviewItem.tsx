import React from "react";
import { IRequestedReviewItemProps } from "./IRequestedReviewItemProps";
import styles from "./RequestedReviewItem.module.scss";
import { BoldRegularText } from "../../../../../components/bold-regular-text/BoldRegularText";
import { Link } from "react-router-dom";

export const RequestedReviewItem = (props: IRequestedReviewItemProps) => {
  const reviewInfo = {
    header: props.header,
    scheduledTo: props.scheduledTo,
    scheduled: props.scheduled,
    team: props.team,
    pullRequest: props.pullRequest,
    description: props.description,
  };

  return (
    <Link to={"/reviewer"} state={{ review: reviewInfo }}>
      <div className={styles.review}>
        <div className={styles.bold}>{props.header}</div>
        <BoldRegularText
          boldText={"Scheduled to: "}
          regularText={props.scheduledTo}
        />
        <BoldRegularText
          boldText={"Scheduled: "}
          regularText={props.scheduled.toLocaleDateString()}
        />
        <BoldRegularText boldText={"Team: "} regularText={props.team} />
      </div>
    </Link>
  );
};
