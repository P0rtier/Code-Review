import React from "react";
import styles from "./TeamMemberComponent.module.scss";
import { ITeamMemberComponentProps } from "./ITeamMemberComponentProps";
import { BoldRegularText } from "../../../../../../components/bold-regular-text/BoldRegularText";

export const TeamMemberComponent = (props: ITeamMemberComponentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <input
          type="checkbox"
          defaultChecked={true}
          onChange={() => props.resolveTeamMember()}
        />
      </div>
      <div className={styles.column}>
        <BoldRegularText boldText={"Name:"} regularText={props.displayName} />
      </div>
      <div className={styles.column}>
        <BoldRegularText boldText={"Mail:"} regularText={props.uniqueName} />
      </div>
    </div>
  );
};
