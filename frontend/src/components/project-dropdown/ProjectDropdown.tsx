import React from "react";
import styles from "./ProjectDropdown.module.scss";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BoldRegularText } from "../bold-regular-text/BoldRegularText";
import { IProjectDropdownProps } from "./IProjectDropdownProps";

export const ProjectDropdown = (props: IProjectDropdownProps) => {
  const { projectNames, selectedProject, selectProject } = props;

  const getProjectsOptions = () => {
    if (projectNames) {
      return (projectNames.map((projectName) => (
        <MenuItem
          onClick={() => selectProject(projectName)}
          key={projectName}
        >
          {projectName}
        </MenuItem>
      )));
    }
  }

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
        {getProjectsOptions()}
      </MenuList>
    </Menu>
  );
};
