import React from "react";
import styles from "./WorkItemInfo.module.scss";
import { BoldRegularText } from "../bold-regular-text/BoldRegularText";
import { Box } from "@chakra-ui/react";
import { IWorkItemInfoProps } from "./IWorkItemInfoProps";
import { joinClasses } from "../../common/utils/joinClasses";

export const WorkItemInfo = (props: IWorkItemInfoProps) => {
  return (
    <Box
      className={joinClasses(
        styles.container,
        props.fullWidth && styles.fullWidth
      )}
      __css={props.style}
    >
      <div className={styles.header}>{props.title}</div>
      <div className={styles.description}>
        <BoldRegularText boldText={"Title: "} regularText={props.title} />
        <BoldRegularText boldText={"Project: "} regularText={props.project} />
        <BoldRegularText
          boldText={"Created date: "}
          regularText={String(props.createdDate)}
        />
        <BoldRegularText boldText={"Tags: "} regularText={String(props.tags)} />
      </div>
    </Box>
  );
};
