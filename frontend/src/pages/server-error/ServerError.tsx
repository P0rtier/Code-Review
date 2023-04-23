import React from "react";
import styles from "./ServerError.module.scss";
import { PageWrapper } from "../../components/page-wrapper/PageWrapper";
import icon from "../../assets/images/server-error-image.svg";

export const ServerError = () => {
  return (
    <PageWrapper>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            Uh oh! Internal server error (500).
          </div>
          <div className={styles.subheader}>Try again in a minute.</div>
        </div>
        <img src={icon} alt={"An engineer with a notepad"} />
      </div>
    </PageWrapper>
  );
};
