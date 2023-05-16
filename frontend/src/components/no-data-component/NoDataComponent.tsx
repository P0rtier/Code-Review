import React from "react";
import styles from "./NoDataComponent.module.scss";
import { NoDataIcon } from "../../assets/icons/NoDataIcon";
import { INoDataComponentProps } from "./INoDataComponentProps";

export const NoDataComponent = (props: INoDataComponentProps) => {
  return (
    <div className={styles.container}>
      <NoDataIcon />
      <div className={styles.header}>{props.header}</div>
    </div>
  );
};
