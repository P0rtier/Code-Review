import React from "react";
import styles from "./WelcomeComponent.module.scss";
import workersImage from "../../../../assets/images/workers.svg";
import { StatusDropdown } from "./components/StatusDropdown";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";

export const WelcomeComponent = () => {
  const primaryOrangeComponent = useStyleConfig(
    StyledComponents.PrimaryOrangeComponent
  );
  
  return (
    <div className={styles.container}>
      <Box className={styles.colorPanel} __css={primaryOrangeComponent}>
        <div className={styles.textContainer}>
          <div className={styles.text}>Welcome, user.</div>
          <StatusDropdown />
        </div>
      </Box>
      <div className={styles.workersImage}>
        <img src={workersImage} alt="Workers" />
      </div>
    </div>
  );
};
