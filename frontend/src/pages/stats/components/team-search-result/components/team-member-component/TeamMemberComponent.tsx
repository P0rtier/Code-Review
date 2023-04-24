import React from "react";
import styles from "./TeamMemberComponent.module.scss";
import { ITeamMemberComponentProps } from "./ITeamMemberComponentProps";
import { BoldRegularText } from "../../../../../../components/bold-regular-text/BoldRegularText";

export const TeamMemberComponent = (props: ITeamMemberComponentProps) => {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        defaultChecked={true}
        onChange={() => props.resolveTeamMember()}
      />
      <BoldRegularText boldText={"Name:"} regularText={props.displayName} />
      <BoldRegularText boldText={"Mail:"} regularText={props.uniqueName} />
    </div>
  );
};
