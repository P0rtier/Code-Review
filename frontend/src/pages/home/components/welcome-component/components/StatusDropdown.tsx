import React from "react";
import styles from "./StatusDropdown.module.scss";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BoldRegularText } from "../../../../../components/bold-regular-text/BoldRegularText";
import { Statuses } from "../../../../../common/enums/Statuses";

export const StatusDropdown = () => {
  const [status, setStatus] = React.useState<string>(Statuses.Available);

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
        <MenuItem onClick={() => setStatus(Statuses.Available)}>
          {Statuses.Available}
        </MenuItem>
        <MenuItem onClick={() => setStatus(Statuses.OnBreak)}>
          {Statuses.OnBreak}
        </MenuItem>
        <MenuItem onClick={() => setStatus(Statuses.OnVacation)}>
          {Statuses.OnVacation}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
