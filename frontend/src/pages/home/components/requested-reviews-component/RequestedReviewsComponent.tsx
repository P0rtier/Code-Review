import React from "react";
import styles from "./RequestedReviewsComponent.module.scss";
import { BoldRegularText } from "../../../../components/bold-regular-text/BoldRegularText";
import { IRequestedReview } from "../../../../common/interfaces/IRequestedReview";

const mockData: IRequestedReview[] = [
    {
        id: '1',
        title: 'Review #1',
        scheduledTo: 'Name Surname',
        scheduled: new Date('25/03/2023'),
        team: 'Team'
    },
    {
        id: '2',
        title: 'Review #2',
        scheduledTo: 'Name Surname',
        scheduled: new Date('25/03/2023'),
        team: 'Team'
    },
    {
        id: '3',
        title: 'Review #3',
        scheduledTo: 'Name Surname',
        scheduled: new Date('25/03/2023'),
        team: 'Team'
    }
];

export const RequestedReviewsComponent = () => {
    const getData = () => {
        return mockData.map((review) => (
            <div className={styles.review} key={review.id}>
                <div className={styles.bold}>
                    {review.title}
                </div>
                <BoldRegularText
                    boldText={"Scheduled to: "}
                    regularText={review.scheduledTo}
                />
                <BoldRegularText
                    boldText={"Scheduled: "}
                    regularText={review.scheduled.toLocaleDateString()}
                />
                <BoldRegularText
                    boldText={"Team: "}
                    regularText={review.team}
                />
            </div>
        ));
    }

    return (
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