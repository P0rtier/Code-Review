import React from "react";
import styles from "./ScheduledReviewElement.module.scss";
import {BoldRegularText} from "../../../../../components/bold-regular-text/BoldRegularText";

interface IProps {
    header: string,
    scheduledTo: string,
    scheduled: string,
    team: string,
    pullRequest: string,
    description: string
}

export const ScheduledReviewElement = (props: IProps) => {
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                {props.header}
            </div>
            <div className={styles.description}>
                <BoldRegularText boldText={"Scheduled to: "} regularText={props.scheduledTo}/>
                <BoldRegularText boldText={"Scheduled: "} regularText={props.scheduled}/>
                <BoldRegularText boldText={"Team : "} regularText={props.team}/>
                <BoldRegularText boldText={"Pull request: "} regularText={props.pullRequest}/>
                <BoldRegularText boldText={"Description: "} regularText={props.description} column={true}/>
            </div>
        </div>
    );
}