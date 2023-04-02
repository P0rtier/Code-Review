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
        bg="#FDFDFE" borderRadius='md'
        w="100%" h="2.5rem"
        boxShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
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
}
