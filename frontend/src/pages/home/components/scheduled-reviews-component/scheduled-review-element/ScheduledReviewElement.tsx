import React from "react";
import styles from "./ScheduledReviewElement.module.scss";
import { BoldRegularText } from "../../../../../components/bold-regular-text/BoldRegularText";
import { IScheduledReviewElementProps } from "./IScheduledReviewElementProps";


export const ScheduledReviewElement = (props: IScheduledReviewElementProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {props.header}
            </div>
            <div className={styles.description}>
                <BoldRegularText
                    boldText={"Scheduled to: "}
                    regularText={props.scheduledTo}
                />
                <BoldRegularText
                    boldText={"Scheduled: "}
                    regularText={props.scheduled}
                />
                <BoldRegularText
                    boldText={"Team : "}
                    regularText={props.team}
                />
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
        </div>
    );
}