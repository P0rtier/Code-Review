import React from "react";
import styles from "./TeamSearchResult.module.scss";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { TeamMemberComponent } from "./components/team-member-component/TeamMemberComponent";
import { ITeamSearchResultProps } from "./ITeamSearchResultProps";

export const TeamSearchResult = (props: ITeamSearchResultProps) => {
  const primaryComponent = useStyleConfig(StyledComponents.PrimaryComponent);

  const getTeamMembers = () => {
    return props.teamMembers.map((teamMember, key) => (
      <TeamMemberComponent
        displayName={teamMember.displayName}
        uniqueName={teamMember.uniqueName}
        key={key}
      />
    ));
  };

  return (
    <Box className={styles.searchResult} __css={primaryComponent}>
      {getTeamMembers()}
    </Box>
  );
};
