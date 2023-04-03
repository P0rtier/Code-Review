import React from "react";
import styles from "./ReviewInfo.module.scss";
import { BoldRegularText } from "../bold-regular-text/BoldRegularText";
import { Box } from "@chakra-ui/react";
import { IReviewInfoProps } from "./IReviewInfoProps";

export const ReviewInfo = (props: IReviewInfoProps) => {
  return (
    <Box className={styles.container} __css={props.style}>
      <div className={styles.header}>{props.header}</div>
      <div className={styles.description}>
        <BoldRegularText
          boldText={"Scheduled to: "}
          regularText={props.scheduledTo}
        />
        <BoldRegularText
          boldText={"Scheduled: "}
          regularText={props.scheduled}
        />
        <BoldRegularText boldText={"Team : "} regularText={props.team} />
        <BoldRegularText
          boldText={"Pull request: "}
          regularText={props.pullRequest}
        />
        <BoldRegularText
          boldText={"Description: "}
          regularText={props.description}
          column={true}
        />
      </div>
    </Box>
  );
};
