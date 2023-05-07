import React, { useEffect } from "react";
import styles from "./Stats.module.scss";
import { PageWrapper } from "../../components/page-wrapper/PageWrapper";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../common/enums/StyledComponents";
import { TeamDropdown } from "./components/team-dropdown/TeamDropdown";
import { ITeamMember } from "../../common/interfaces/ITeamMember";
import { TeamSearchResult } from "./components/team-search-result/TeamSearchResult";
import { TeamGraphs } from "./components/team-graphs/TeamGraphs";

const teamMembersMock: ITeamMember[] = [
  {
    displayName: "Name",
    uniqueName: "mail@mail.com",
    teamName: "Alpha",
    reviewsInfo: {
      done: 1,
      active: 2,
      avgTime: 12,
    },
  },
  {
    displayName: "Name",
    uniqueName: "mail@mail.com",
    teamName: "Alpha",
    reviewsInfo: {
      done: 4,
      active: 8,
      avgTime: 16,
    },
  },
  {
    displayName: "Name",
    uniqueName: "mail@mail.com",
    teamName: "Beta",
    reviewsInfo: {
      done: 8,
      active: 9,
      avgTime: 21,
    },
  },
];

const teamMock: string[] = ["Alpha", "Beta", "Gamma", "Delta"];

export const Stats = () => {
  const [teamMembers, setTeamMembers] =
    React.useState<ITeamMember[]>(teamMembersMock);
  const [reducedTeamMembers, setReducedTeamMembers] =
    React.useState<ITeamMember[]>(teamMembersMock);

  const attentionComponent = useStyleConfig(
    StyledComponents.AttentionComponent
  );

  const filterTeamMembersByTeam = (teamName: string) => {
    setTeamMembers(
      teamMembersMock.filter((teamMember) => teamMember.teamName === teamName)
    );
  };

  useEffect(() => {
    setReducedTeamMembers(teamMembers);
  }, [teamMembers]);

  const filterTeamMembersByCheckbox = () => {
    setReducedTeamMembers(
      teamMembers.filter(
        (teamMember, key) => document.getElementsByTagName("input")[key].checked
      )
    );
  };

  return (
    <PageWrapper smallGap={true}>
      <div className={styles.container}>
        <Box className={styles.teamSelector} __css={attentionComponent}>
          <div className={styles.title}>Team stats</div>
          <TeamDropdown
            teams={teamMock}
            setCurrentTeam={filterTeamMembersByTeam}
          />
        </Box>
        <TeamSearchResult
          teamMembers={teamMembers}
          resolveTeamMember={filterTeamMembersByCheckbox}
        />
        <TeamGraphs teamMembers={reducedTeamMembers} />
      </div>
    </PageWrapper>
  );
};
