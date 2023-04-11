import React from "react";
import styles from "./StatusDropdown.module.scss";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BoldRegularText } from "../../../../../components/bold-regular-text/BoldRegularText";
import { UserStatuses } from "../../../../../common/enums/UserStatuses";

export const StatusDropdown = () => {
  const [status, setStatus] = React.useState<string>(UserStatuses.Available);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant={"welcome"}
      >
        <div className={styles.container}>
          <BoldRegularText boldText={"Status: "} regularText={status} />
        </div>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => setStatus(UserStatuses.Available)}>
          {UserStatuses.Available}
        </MenuItem>
        <MenuItem onClick={() => setStatus(UserStatuses.OnBreak)}>
          {UserStatuses.OnBreak}
        </MenuItem>
        <MenuItem onClick={() => setStatus(UserStatuses.OnVacation)}>
          {UserStatuses.OnVacation}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
