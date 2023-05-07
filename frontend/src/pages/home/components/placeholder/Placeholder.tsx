import * as React from "react";
import styles from "./Placeholder.module.scss";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { joinClasses } from "../../../../common/utils/joinClasses";
import { IPlaceholderProps } from "./IPlaceholderProps";

export const Placeholder = (props: IPlaceholderProps) => {
  const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);

  return (
    <Box
      className={joinClasses(styles.container, styles.placeholder)}
      __css={primaryStyles}
    >
      <div className={joinClasses(styles.header, styles.placeholderHeader)}>
        {props.header}
      </div>
      <div className={styles.activity}></div>
    </Box>
  );
};
