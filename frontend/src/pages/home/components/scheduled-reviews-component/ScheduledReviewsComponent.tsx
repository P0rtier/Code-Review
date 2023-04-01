import React from "react";
import styles from "./ScheduledReviewsComponent.module.scss";
import {ScheduledReviewElement} from "./scheduled-review-element/ScheduledReviewElement";

const mockData = {
    'review1': {
        title: 'Review #1',
        scheduledTo: 'Name Surname',
        scheduled: '25/03/2023',
        team: 'Team',
        pullRequest: 'info',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut felis eget nisl finibus ultrices sed eget dui. Proin a purus leo.'
    },
    'review2': {
        title: 'Review #2',
        scheduledTo: 'Name Surname',
        scheduled: '25/03/2023',
        team: 'Team',
        pullRequest: 'info',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut felis eget nisl finibus ultrices sed eget dui. Proin a purus leo.'
    },
    'review3': {
        title: 'Review #3',
        scheduledTo: 'Name Surname',
        scheduled: '25/03/2023',
        team: 'Team',
        pullRequest: 'info',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut felis eget nisl finibus ultrices sed eget dui. Proin a purus leo.'
    }
}

export const ScheduledReviewsComponent = () => {
    const getData = () => {
        return Object.keys(mockData).map((review, index) => {
            return (
                <ScheduledReviewElement header={mockData[review as keyof typeof mockData].title} scheduledTo={mockData[review as keyof typeof mockData].scheduledTo} scheduled={mockData[review as keyof typeof mockData].scheduled} team={mockData[review as keyof typeof mockData].team} pullRequest={mockData[review as keyof typeof mockData].pullRequest} description={mockData[review as keyof typeof mockData].description} key={index}/>
            );
        });
    }

    return(
        <div className={styles.container}>
            <div className={styles.colorPanel}></div>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    Scheduled reviews
                </div>
                <div className={styles.reviewContainer}>
                    {getData()}
                </div>
            </div>
        </div>
    );
}