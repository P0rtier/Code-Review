import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { getIconColor } from "../../common/utils/themeHelpers";

export const HomeIcon = () => {
  const { colorMode } = useColorMode();

  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.25 15L15 3.53748L28.75 15"
        stroke={getIconColor(colorMode)}
        strokeWidth={2.5}
        strokeMiterlimit={10}
      />
      <path
        d="M24.1624 11.5625V26.4625H18.4374V17.2875H11.5624V26.4625H5.8374V11.5625"
        stroke={getIconColor(colorMode)}
        strokeWidth={2.5}
        strokeMiterlimit={10}
      />
    </svg>
  );
};
