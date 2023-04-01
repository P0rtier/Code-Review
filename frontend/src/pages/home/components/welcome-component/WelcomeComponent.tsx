import React from "react";
import styles from "./WelcomeComponent.module.scss";
import workersImage from "../../../../assets/images/workers.svg";
import {StatusDropdown} from "./components/StatusDropdown";

export const WelcomeComponent = () => {
    return (
        <div className={styles.container}>
            <div className={styles.colorPanel}>
                <div className={styles.textContainer}>
                    <div className={styles.text}>
                        Welcome, user.
                    </div>
                    <StatusDropdown/>
                </div>
            </div>
            <div className={styles.workersImage}>
                <img src={workersImage} alt="Workers"/>
            </div>
        </div>
    );
}