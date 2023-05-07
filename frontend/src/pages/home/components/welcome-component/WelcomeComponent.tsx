import React, { useContext } from "react";
import styles from "./WelcomeComponent.module.scss";
import workersImage from "../../../../assets/images/workers.svg";
import { ProjectDropdown } from "./components/ProjectDropdown";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { UserContext } from "../../../../common/providers/UserProvider";
import { IWelcomComponentProps } from "./IWelcomeComponentProps";

export const WelcomeComponent = (props: IWelcomComponentProps) => {
  const primaryOrangeComponent = useStyleConfig(
    StyledComponents.PrimaryOrangeComponent
  );

  const { state: user } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <Box className={styles.colorPanel} __css={primaryOrangeComponent}>
        <div className={styles.textContainer}>
          <div className={styles.text}>Welcome, {user?.email}</div>
          <ProjectDropdown {...props} />
        </div>
      </Box>
      <div className={styles.workersImage}>
        <img src={workersImage} alt="Workers" />
      </div>
    </div>
  );
};
