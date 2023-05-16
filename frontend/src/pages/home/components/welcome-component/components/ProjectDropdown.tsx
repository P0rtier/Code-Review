import React, { useEffect } from "react";
import styles from "./ProjectDropdown.module.scss";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BoldRegularText } from "../../../../../components/bold-regular-text/BoldRegularText";
import { IProjectDropdownProps } from "./IProjectDropdownProps";

export const ProjectDropdown = (props: IProjectDropdownProps) => {
  const { projectNames, selectedProject, selectProject } = props;
  const [noProjects, setNoProjects] = React.useState<boolean>(false);

  useEffect(() => {
    if (projectNames.length === 0) {
      setNoProjects(true);
    } else {
      setNoProjects(false);
    }
  }, [projectNames]);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant={"welcome"}
        disabled={!!selectedProject}
      >
        <div className={styles.container}>
          {noProjects ? (
            <BoldRegularText boldText={"No projects found."} regularText={""} />
          ) : (
            <BoldRegularText
              boldText={"Project: "}
              regularText={selectedProject || ""}
            />
          )}
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
