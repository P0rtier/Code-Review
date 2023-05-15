import React, { useContext } from "react";
import styles from "./WelcomeComponent.module.scss";
import { ProjectDropdown } from "../../../../components/project-dropdown/ProjectDropdown";
import workersImage from "../../../../assets/images/programming.svg";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { UserContext } from "../../../../common/providers/UserProvider";
import { IWelcomeComponentProps } from "./IWelcomeComponentProps";
import { DropdownPlaceholder } from "../../../../components/placeholders/dropdown-placeholder/DropdownPlaceholder";

export const WelcomeComponent = (props: IWelcomeComponentProps) => {
  const attentionComponent = useStyleConfig(
    StyledComponents.AttentionComponent
  );
  const { state: user } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <Box className={styles.colorPanel} __css={attentionComponent}>
        <div className={styles.textContainer}>
          <div className={styles.text}>Welcome, {user?.email}</div>
          {props.loadingState ? (
            <DropdownPlaceholder header={"Loading projects..."} />
          ) : (
            <ProjectDropdown {...props} />
          )}
        </div>
      </Box>
      <div className={styles.workersImage}>
        <img src={workersImage} alt="Workers" />
      </div>
    </div>
  );
};
