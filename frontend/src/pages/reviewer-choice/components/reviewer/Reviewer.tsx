import React from "react";
import styles from "./Reviewer.module.scss";
import { IReviewerProps } from "./IReviewerProps";
import { BoldRegularText } from "../../../../components/bold-regular-text/BoldRegularText";
import { Button, Tooltip } from "@chakra-ui/react";
import agent from "../../../../common/api/agent";
import { toast } from "react-toastify";

export const Reviewer = (props: IReviewerProps) => {
  const getOpacityAvailable = () => {
    return props.availability ? 1 : 0.5;
  };

  const assign = () => {
    agent.Reviewers.assign(
      props.reviewId,
      props.uniqueName,
      props.project
    ).then(() =>
      toast.success(
        `Review assigned to ${props.displayName} (${props.uniqueName})`
      )
    );
  };

  const reviewerLabel = `Mail: ${props.uniqueName} 
    \n Teams: ${props.teamNames.join(", ")} 
    \n Status: ${props.availability ? "Available" : "Unavailable"}`;
  return (
    <Tooltip hasArrow whiteSpace="pre-line" label={reviewerLabel}>
      <div className={styles.container}>
        <div className={styles.columnOne}>
          <BoldRegularText
            boldText={"Name:"}
            regularText={props.displayName}
            opacity={getOpacityAvailable()}
          />
        </div>
        <div className={styles.columnTwo}>
          <BoldRegularText
            boldText={"Scheduled reviews:"}
            regularText={String(props.activeReviews)}
            opacity={getOpacityAvailable()}
          />
        </div>
        <div className={styles.columnThree}>
          <Button
            className={styles.assignButton}
            variant={"welcome"}
            onClick={assign}
          >
            Assign
          </Button>
        </div>
      </div>
    </Tooltip>
  );
};
