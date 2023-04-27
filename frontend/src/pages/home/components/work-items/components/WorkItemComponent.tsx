import React from "react";
import { IWorkItemComponentProps } from "./IWorkItemComponentProps";
import styles from "./WorkItemComponent.module.scss";
import { BoldRegularText } from "../../../../../components/bold-regular-text/BoldRegularText";
import { Link } from "react-router-dom";

export const WorkItemComponent = (props: IWorkItemComponentProps) => {
  const reviewInfo = {
    title: props.title,
    project: props.project,
    createdDate: props.createdDate,
    tags: props.tags,
  };

  return (
    <Link to={"/reviewer"} state={{ review: reviewInfo }}>
      <div className={styles.review}>
        <BoldRegularText boldText={"Title: "} regularText={props.title} />
        <BoldRegularText boldText={"Project: "} regularText={props.project} />
        <BoldRegularText
          boldText={"Created date: "}
          regularText={props.createdDate.toLocaleDateString()}
        />
        <BoldRegularText boldText={"Tags: "} regularText={String(props.tags)} />
      </div>
    </Link>
  );
};
