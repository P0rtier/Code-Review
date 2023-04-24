import React from "react";
import styles from "./TeamGraphs.module.scss";
import { ITeamGraphsProps } from "./ITeamGraphsProps";
import { joinClasses } from "../../../../common/utils/joinClasses";
import { GraphComponent } from "./components/GraphComponent";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";

export const TeamGraphs = (props: ITeamGraphsProps) => {
  const secondaryComponent = useStyleConfig(
    StyledComponents.SecondaryComponent
  );

  const parseDoneData = () => {
    return props.teamMembers.map((teamMember) => ({
      name: teamMember.uniqueName,
      value: teamMember.reviewsInfo.done,
    }));
  };

  const parseActiveData = () => {
    return props.teamMembers.map((teamMember) => ({
      name: teamMember.uniqueName,
      value: teamMember.reviewsInfo.active,
    }));
  };

  const parseAvgTimeData = () => {
    return props.teamMembers.map((teamMember) => ({
      name: teamMember.uniqueName,
      value: teamMember.reviewsInfo.avgTime,
    }));
  };

  return (
    <div className={styles.container}>
      <Box
        className={joinClasses(styles.graph, styles.firstColumn)}
        __css={secondaryComponent}
      >
        <GraphComponent parseData={parseDoneData} title={"Finished reviews"} />
      </Box>
      <Box
        className={joinClasses(styles.graph, styles.secondColumn)}
        __css={secondaryComponent}
      >
        <GraphComponent parseData={parseActiveData} title={"Active reviews"} />
      </Box>
      <Box
        className={joinClasses(styles.graph, styles.thirdColumn)}
        __css={secondaryComponent}
      >
        <GraphComponent
          parseData={parseAvgTimeData}
          title={"Average review time"}
        />
      </Box>
    </div>
  );
};
