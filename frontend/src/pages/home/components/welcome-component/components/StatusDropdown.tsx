import React from "react";
import styles from "./StatusDropdown.module.scss";
import {Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {BoldRegularText} from "../../../../../components/bold-regular-text/BoldRegularText";

export const StatusDropdown = () => {
    const [status, setStatus] = React.useState<string>("Available");

    return(
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="#FDFDFE" borderRadius='md' w="100%" h="2.5rem" boxShadow="0 4px 4px rgba(0, 0, 0, 0.25)">
            <div className={styles.container}>
                <BoldRegularText boldText={"Status: "} regularText={status}/>
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setStatus("Available")}>Available</MenuItem>
            <MenuItem onClick={() => setStatus("On break")}>On break</MenuItem>
            <MenuItem onClick={() => setStatus("On vacations")}>On vacations</MenuItem>
          </MenuList>
        </Menu>
    );
}
