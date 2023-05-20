import React from "react";
import styles from "./AssignedReviewInfo.module.scss";
import { BoldRegularText } from "../bold-regular-text/BoldRegularText";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { IAssignedReviewInfoProps } from "./IAssignedReviewInfoProps";
import { StyledComponents } from "../../common/enums/StyledComponents";

export const AssignedReviewInfo = (props: IAssignedReviewInfoProps) => {
  const headerStyles = useStyleConfig(StyledComponents.ReviewHeader);
  const tags = props.tags.length > 0 ? String(props.tags) : "-";

  return (
    <Box className={styles.container} __css={props.style}>
      <a href={props.link} target="_blank" rel="noreferrer">
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
          <BoldRegularText boldText={"Tags: "} regularText={tags} />
        </div>
      </a>
    </Box>
  );
};
