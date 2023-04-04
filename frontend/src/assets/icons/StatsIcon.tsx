import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { getIconColor } from "../../common/utils/themeHelpers";

export const StatsIcon = () => {
  const { colorMode } = useColorMode();

  return (
    <svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_38_2968)">
        <path
          d="M1.6875 0.5625V25.3125H26.4375"
          stroke={getIconColor(colorMode)}
          strokeWidth={2.5}
          strokeMiterlimit={10}
        />
        <path
          d="M21.0601 11.3287V22.0837"
          stroke={getIconColor(colorMode)}
          strokeWidth={2.5}
          strokeMiterlimit={10}
        />
        <path
          d="M14.6025 2.7113V22.0838"
          stroke={getIconColor(colorMode)}
          strokeWidth={2.5}
          strokeMiterlimit={10}
        />
        <path
          d="M8.14502 7.02002V22.0838"
          stroke={getIconColor(colorMode)}
          strokeWidth={2.5}
          strokeMiterlimit={10}
        />
      </g>
      <defs>
        <clipPath>
          <rect width={27} height={27} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
