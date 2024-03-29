import React from "react";
import styles from "./ReviewToAssignInfo.module.scss";
import { BoldRegularText } from "../bold-regular-text/BoldRegularText";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { IReviewToAssignInfoProps } from "./IReviewToAssignInfoProps";
import { joinClasses } from "../../common/utils/joinClasses";
import { StyledComponents } from "../../common/enums/StyledComponents";

export const ReviewToAssignInfo = (props: IReviewToAssignInfoProps) => {
  const attentionComponent = useStyleConfig(
    StyledComponents.AttentionComponent
  );
  const tags = props.tags.length > 0 ? String(props.tags) : "-";

  return (
    <a href={props.link} target="_blank" rel="noreferrer">
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
          <BoldRegularText boldText={"Tags: "} regularText={tags} />
        </div>
      </Box>
    </a>
  );
};
