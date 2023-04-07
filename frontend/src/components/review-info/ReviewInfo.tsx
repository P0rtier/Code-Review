import React from "react";
import styles from "./ReviewInfo.module.scss";
import { BoldRegularText } from "../bold-regular-text/BoldRegularText";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { IReviewInfoProps } from "./IReviewInfoProps";
import { StyledComponents } from "../../common/enums/StyledComponents";

export const ReviewInfo = (props: IReviewInfoProps) => {
  const headerStyles = useStyleConfig(StyledComponents.ReviewHeader);

  return (
    <Box className={styles.container} __css={props.style}>
      <Box className={styles.header} __css={headerStyles}>
        {props.header}
      </Box>
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
