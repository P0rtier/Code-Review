import React from "react";
import styles from "./ProjectDropdown.module.scss";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BoldRegularText } from "../../../../../components/bold-regular-text/BoldRegularText";
import { IProjectDropdownProps } from "./IProjectDropdownProps";

export const ProjectDropdown = (props: IProjectDropdownProps) => {
  const { projectNames, selectedProject, selectProject } = props;

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant={"welcome"}
        disabled={!!selectedProject}
      >
        <div className={styles.container}>
          <BoldRegularText
            boldText={"Project: "}
            regularText={selectedProject || ""}
          />
        </div>
      </MenuButton>
      <MenuList>
        {projectNames.map((projectName) => (
          <MenuItem
            onClick={() => selectProject(projectName)}
            key={projectName}
          >
            {projectName}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
