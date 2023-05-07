import * as React from "react";
import styles from "./DropdownPlaceholder.module.scss";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../common/enums/StyledComponents";
import { IDropdownPlaceholderProps } from "./IDropdownPlaceholderProps";

export const DropdownPlaceholder = (props: IDropdownPlaceholderProps) => {
  const secondaryStyles = useStyleConfig(StyledComponents.SecondaryComponent);

  return (
    <Box className={styles.container} __css={secondaryStyles}>
      <div className={styles.header}>{props.header}</div>
      <div className={styles.activity}></div>
    </Box>
  );
};
