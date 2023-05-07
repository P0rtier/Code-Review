import React from "react";
import styles from "./AssignedReviewInfo.module.scss";
import { BoldRegularText } from "../bold-regular-text/BoldRegularText";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { IAssignedReviewInfoProps } from "./IAssignedReviewInfoProps";
import { StyledComponents } from "../../common/enums/StyledComponents";

export const AssignedReviewInfo = (props: IAssignedReviewInfoProps) => {
  const headerStyles = useStyleConfig(StyledComponents.ReviewHeader);

  return (
    <Box className={styles.container} __css={props.style}>
      <a href={props.link}>
        <Box className={styles.header} __css={headerStyles}>
          {props.title}
        </Box>
        <div className={styles.description}>
          <BoldRegularText
            boldText={"Scheduled by: "}
            regularText={props.scheduledByName}
          />
          <BoldRegularText
            boldText={"Scheduled: "}
            regularText={props.createdDate.toLocaleDateString()}
          />
          <BoldRegularText boldText={"Project: "} regularText={props.project} />
          <BoldRegularText
            boldText={"Tags: "}
            regularText={String(props.tags)}
          />
        </div>
      </a>
    </Box>
  );
};
