import React from "react";
import styles from "./PageWrapper.module.scss";
import { IPageWrapperProps } from "./IPageWrapperProps";
import { joinClasses } from "../../common/utils/joinClasses";

export const PageWrapper = (props: IPageWrapperProps) => {
  return (
    <div className={styles.container}>
      <div
        className={joinClasses(
          styles.componentContainer,
          props.smallGap && styles.smallGap
        )}
      >
        {props.children}
      </div>
    </div>
  );
};
