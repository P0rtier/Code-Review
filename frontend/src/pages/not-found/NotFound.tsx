import React from "react";
import styles from "./NotFound.module.scss";
import { PageWrapper } from "../../components/page-wrapper/PageWrapper";
import icon from "../../assets/images/not-found-image.svg";

export const NotFound = () => {
  return (
    <PageWrapper>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>You got lost? Page not found.</div>
          <div className={styles.subheader}>Make sure you’re logged in.</div>
        </div>
        <img src={icon} alt={"Aliens and a flying saucer"} />
      </div>
    </PageWrapper>
  );
};
