import React, { useEffect } from "react";
import styles from "./TeamMemberComponent.module.scss";
import { ITeamMemberComponentProps } from "./ITeamMemberComponentProps";
import { BoldRegularText } from "../../../../../../components/bold-regular-text/BoldRegularText";
import { StateContext } from "../../../../../../common/providers/StatsProvider";
import { StatsActions } from "../../../../../../common/enums/StatsActions";

export const TeamMemberComponent = (props: ITeamMemberComponentProps) => {
  const { dispatch } = React.useContext(StateContext);
  const [checked, setChecked] = React.useState<boolean>(true);
  const [displayText, setDisplayText] = React.useState<string>("Unselect");

  useEffect(() => {
    if (checked) {
      dispatch({
        type: StatsActions.AddTeamMember,
        payload: props.uniqueName,
      });
    } else {
      dispatch({
        type: StatsActions.RemoveTeamMember,
        payload: props.uniqueName,
      });
    }
  }, [checked]);

  const handleClick = () => {
    setChecked(!checked);

    if (displayText === "Select") {
      setDisplayText("Unselect");
    } else {
      setDisplayText("Select");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <input type={"checkbox"} checked={checked} onChange={handleClick} />
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
