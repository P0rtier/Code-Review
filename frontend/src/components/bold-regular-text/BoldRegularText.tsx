import React from "react";
import styles from "./BoldRegularText.module.scss";
import {joinClasses} from "../../utils/joinClasses";

interface IProps {
    boldText: string,
    regularText: string,
    column?: boolean
}

export const BoldRegularText = (props: IProps) => {
    return(
        <div className={joinClasses(styles.container, props.column && styles.containerColumn)}>
            <div className={styles.bold}>
                {props.boldText}
            </div>
            <div className={styles.regular}>
                {props.regularText}
            </div>
        </div>
    );
}
