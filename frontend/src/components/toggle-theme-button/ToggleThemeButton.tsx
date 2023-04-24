import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";
import * as React from "react";
import { getIconColor, isLightMode } from "../../common/utils/helpers";

const ToggleThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const icon = isLightMode(colorMode) ? (
    <MoonIcon boxSize={6} />
  ) : (
    <SunIcon boxSize={7} />
  );

  return (
    <IconButton
      variant="ghost"
      aria-label="toggle theme"
      size="sm"
      color={getIconColor(colorMode)}
      _hover={{}}
      _active={{}}
      icon={icon}
      onClick={toggleColorMode}
    />
  );
};

export default ToggleThemeButton;
