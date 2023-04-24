import React, { useEffect } from "react";
import styles from "./TeamDropdown.module.scss";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BoldRegularText } from "../../../../components/bold-regular-text/BoldRegularText";
import { ITeamDropdownProps } from "./ITeamDropdownProps";

export const TeamDropdown = (props: ITeamDropdownProps) => {
  const [status, setStatus] = React.useState<string>(props.teams[0]);

  useEffect(() => {
    props.setCurrentTeam(status);
  }, [status]);

  const getTeams = () => {
    return props.teams.map((team, key) => (
      <MenuItem onClick={() => setStatus(team)} key={key}>
        {team}
      </MenuItem>
    ));
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant={"welcome"}
      >
        <div className={styles.container}>
          <BoldRegularText boldText={"Team: "} regularText={status} />
        </div>
      </MenuButton>
      <MenuList>{getTeams()}</MenuList>
    </Menu>
  );
};
