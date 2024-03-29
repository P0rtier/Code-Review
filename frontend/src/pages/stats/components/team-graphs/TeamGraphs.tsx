import React from "react";
import styles from "./TeamGraphs.module.scss";
import { ITeamGraphsProps } from "./ITeamGraphsProps";
import { GraphComponent } from "./components/GraphComponent";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { Placeholder } from "../../../../components/placeholders/placeholder/Placeholder";

export const TeamGraphs = (props: ITeamGraphsProps) => {
  const primaryComponent = useStyleConfig(StyledComponents.PrimaryComponent);

  const parseDoneData = () => {
    const data = props.teamMembers.filter((teamMember) => {
      return teamMember.reviewStats.done > 0;
    });

    return data.map((teamMember) => ({
      name: teamMember.uniqueName,
      value: teamMember.reviewStats.done,
    }));
  };

  const parseActiveData = () => {
    const data = props.teamMembers.filter((teamMember) => {
      return teamMember.reviewStats.active > 0;
    });

    return data.map((teamMember) => ({
      name: teamMember.uniqueName,
      value: teamMember.reviewStats.active,
    }));
  };

  const parseAvgTimeData = () => {
    const data = props.teamMembers.filter((teamMember) => {
      return teamMember.reviewStats.avgReviewHours > 0;
    });

    return data.map((teamMember) => ({
      name: teamMember.uniqueName,
      value: teamMember.reviewStats.avgReviewHours,
    }));
  };

  return (
    <div className={styles.container}>
      <Box className={styles.graph} __css={primaryComponent}>
        {props.loading ? (
          <Placeholder header={""} fullHeight={true} />
        ) : (
          <GraphComponent
            parseData={parseDoneData}
            title={"Finished reviews"}
          />
        )}
      </Box>
      <Box className={styles.graph} __css={primaryComponent}>
        {props.loading ? (
          <Placeholder header={""} fullHeight={true} />
        ) : (
          <GraphComponent
            parseData={parseActiveData}
            title={"Active reviews"}
          />
        )}
      </Box>
      <Box className={styles.graph} __css={primaryComponent}>
        {props.loading ? (
          <Placeholder header={""} fullHeight={true} />
        ) : (
          <GraphComponent
            parseData={parseAvgTimeData}
            title={"Average review time"}
            isTime={true}
          />
        )}
      </Box>
    </div>
  );
};
