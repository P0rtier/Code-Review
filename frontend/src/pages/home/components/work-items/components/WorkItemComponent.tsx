import React from "react";
import { IWorkItemComponentProps } from "./IWorkItemComponentProps";
import styles from "./WorkItemComponent.module.scss";
import { BoldRegularText } from "../../../../../components/bold-regular-text/BoldRegularText";
import { Link } from "react-router-dom";

export const WorkItemComponent = (props: IWorkItemComponentProps) => {
  const reviewInfo = {
    header: props.header,
    state: props.state,
    activityDate: props.activityDate,
    tags: props.tags,
  };

  return (
    <Link to={"/reviewer"} state={{ review: reviewInfo }}>
      <div className={styles.review}>
        <div className={styles.bold}>{props.header}</div>
        <BoldRegularText boldText={"State: "} regularText={props.state} />
        <BoldRegularText
          boldText={"Activity date: "}
          regularText={props.activityDate.toLocaleDateString()}
        />
        <BoldRegularText boldText={"Tags: "} regularText={String(props.tags)} />
      </div>
    </Link>
  );
};
