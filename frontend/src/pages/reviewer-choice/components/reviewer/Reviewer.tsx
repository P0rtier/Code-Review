import React from "react";
import styles from "./Reviewer.module.scss";
import { IReviewerProps } from "./IReviewerProps";
import { BoldRegularText } from "../../../../components/bold-regular-text/BoldRegularText";
import { Button, Tooltip } from "@chakra-ui/react";

export const Reviewer = (props: IReviewerProps) => {

  const getOpacityAvailable = () => {
    return props.isAvailable ? 1 : 0.5;
  }
  const reviewerLabel = `Mail: ${props.uniqueName} \n Team: ${props.team} \n Status: ${props.isAvailable ? "Available" : "Unavailable"}`
  return (
    <Tooltip hasArrow whiteSpace="pre-line" label={reviewerLabel}>
      <div className={styles.container} >
        <div className={styles.columnOne}>
          <BoldRegularText boldText={"Name:"} regularText={props.displayName} opacity={getOpacityAvailable()} />
        </div>
        <div className={styles.columnTwo}>
          <BoldRegularText
            boldText={"Scheduled reviews:"}
            regularText={String(props.scheduledReviews)}
            opacity={getOpacityAvailable()}
          />
        </div>
        <div className={styles.columnThree}>
          <Button className={styles.assignButton}>
            Assign
          </Button>
        </div>
      </div>
    </Tooltip>
  );
};