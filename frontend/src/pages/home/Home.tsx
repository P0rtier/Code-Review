import React from 'react';
import styles from './Home.module.scss';
import backgroundImage from '../../assets/images/background.svg';
import { WelcomeComponent } from "./components/welcome-component/WelcomeComponent";
import { RequestedReviewsComponent } from "./components/requested-reviews-component/RequestedReviewsComponent";
import { ScheduledReviewsComponent } from "./components/scheduled-reviews-component/ScheduledReviewsComponent";

export const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <img
                src={backgroundImage}
                alt="Circles generated with app.haikei.app"
                className={styles.background}
            />
            <div className={styles.componentContainer}>
                <WelcomeComponent />
                <RequestedReviewsComponent />
                <ScheduledReviewsComponent />
            </div>
        </div>
    );
}
