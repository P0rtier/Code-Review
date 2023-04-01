import React from "react";
import styles from "./RequestedReviewsComponent.module.scss";
import {BoldRegularText} from "../../../../components/bold-regular-text/BoldRegularText";

const mockData = {
    'review1': {
        title: 'Review #1',
        scheduledTo: 'Name Surname',
        scheduled: '25/03/2023',
        team: 'Team'
    },
    'review2': {
        title: 'Review #2',
        scheduledTo: 'Name Surname',
        scheduled: '25/03/2023',
        team: 'Team'
    },
    'review3': {
        title: 'Review #3',
        scheduledTo: 'Name Surname',
        scheduled: '25/03/2023',
        team: 'Team'
    }
}

export const RequestedReviewsComponent = () => {
    const getData = () => {
        return Object.keys(mockData).map((review, index) => {
            return (
                <div className={styles.review} key={index}>
                    <div className={styles.bold}>
                        {mockData[review as keyof typeof mockData].title}
                    </div>
                    <BoldRegularText boldText={"Scheduled to: "} regularText={mockData[review as keyof typeof mockData].scheduledTo}/>
                    <BoldRegularText boldText={"Scheduled: "} regularText={mockData[review as keyof typeof mockData].scheduled}/>
                    <BoldRegularText boldText={"Team: "} regularText={mockData[review as keyof typeof mockData].team}/>
                </div>
            );
        });
    }

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                Requested reviews
            </div>
            <div className={styles.reviewContainer}>
                {getData()}
            </div>
        </div>
    );
}