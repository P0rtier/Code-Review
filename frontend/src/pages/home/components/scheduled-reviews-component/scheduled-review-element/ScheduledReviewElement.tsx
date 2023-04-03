import React from "react";
import styles from "./ScheduledReviewElement.module.scss";
import { BoldRegularText } from "../../../../../components/bold-regular-text/BoldRegularText";
import { IScheduledReviewElementProps } from "./IScheduledReviewElementProps";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../../common/enums/StyledComponents";

export const ScheduledReviewElement = (props: IScheduledReviewElementProps) => {
  const secondaryStyles = useStyleConfig(StyledComponents.SecondaryComponent);

  return (
    <Box className={styles.container} __css={secondaryStyles}>
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
