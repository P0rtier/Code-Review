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
        {props.title}
      </Box>
      <div className={styles.description}>
        <BoldRegularText
          boldText={"Scheduled by: "}
          regularText={props.scheduledBy}
        />
        <BoldRegularText
          boldText={"Scheduled: "}
          regularText={props.createdDate}
        />
        <BoldRegularText boldText={"Project: "} regularText={props.project} />
        <BoldRegularText boldText={"Tags: "} regularText={String(props.tags)} />
      </div>
    </Box>
  );
};
