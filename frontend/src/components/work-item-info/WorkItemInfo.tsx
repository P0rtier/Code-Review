import React from "react";
import styles from "./WorkItemInfo.module.scss";
import { BoldRegularText } from "../bold-regular-text/BoldRegularText";
import { Box } from "@chakra-ui/react";
import { IWorkItemInfoProps } from "./IWorkItemInfoProps";

export const WorkItemInfo = (props: IWorkItemInfoProps) => {
  return (
    <Box className={styles.container} __css={props.style}>
      <div className={styles.header}>{props.header}</div>
      <div className={styles.description}>
        <BoldRegularText boldText={"State: "} regularText={props.state} />
        <BoldRegularText
          boldText={"Activity date: "}
          regularText={String(props.activityDate)}
        />
        <BoldRegularText boldText={"Tags: "} regularText={String(props.tags)} />
      </div>
    </Box>
  );
};
