import * as React from "react";
import styles from "./Placeholder.module.scss";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../common/enums/StyledComponents";
import { IPlaceholderProps } from "./IPlaceholderProps";
import { joinClasses } from "../../../common/utils/joinClasses";

export const Placeholder = (props: IPlaceholderProps) => {
  const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);

  return (
    <Box
      className={joinClasses(
        styles.container,
        props.fullHeight && styles.fullHeight
      )}
      __css={primaryStyles}
    >
      <div className={styles.header}>{props.header}</div>
      <div className={styles.activity}></div>
    </Box>
  );
};
