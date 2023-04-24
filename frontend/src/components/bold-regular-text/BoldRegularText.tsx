import React from "react";
import styles from "./BoldRegularText.module.scss";
import { joinClasses } from "../../common/utils/joinClasses";
import { IBoldRegularTextProps } from "./IBoldRegularTextProps";

export const BoldRegularText = (props: IBoldRegularTextProps) => {
  return (
    <div
      className={joinClasses(
        styles.container,
        props.column && styles.containerColumn
      )}
    >
      <div className={styles.bold}>{props.boldText}</div>
      <div className={styles.regular}>{props.regularText}</div>
    </div>
  );
};
