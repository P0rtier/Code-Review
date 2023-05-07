import React from "react";
import styles from "./WorkItemInfo.module.scss";
import { BoldRegularText } from "../bold-regular-text/BoldRegularText";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { IWorkItemInfoProps } from "./IWorkItemInfoProps";
import { joinClasses } from "../../common/utils/joinClasses";
import { StyledComponents } from "../../common/enums/StyledComponents";

export const WorkItemInfo = (props: IWorkItemInfoProps) => {
  const attentionComponent = useStyleConfig(
    StyledComponents.AttentionComponent
  );

  return (
    <a href={props.link}>
      <Box
        className={joinClasses(
          styles.container,
          props.fullWidth && styles.fullWidth
        )}
        __css={attentionComponent}
      >
        <div className={styles.header}>{props.title}</div>
        <div className={styles.description}>
          <BoldRegularText boldText={"ID: "} regularText={props.id} />
          <BoldRegularText boldText={"Project: "} regularText={props.project} />
          <BoldRegularText
            boldText={"Created date: "}
            regularText={props.createdDate.toLocaleDateString()}
          />
          <BoldRegularText
            boldText={"Tags: "}
            regularText={String(props.tags)}
          />
        </div>
      </Box>
    </a>
  );
};
