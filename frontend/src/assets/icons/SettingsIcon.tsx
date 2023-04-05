import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { getIconColor } from "../../common/utils/themeHelpers";

export const SettingsIcon = () => {
  const { colorMode } = useColorMode();

  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 17.5C14.9283 17.5 15.8185 17.1313 16.4749 16.4749C17.1313 15.8185 17.5 14.9283 17.5 14C17.5 13.0717 17.1313 12.1815 16.4749 11.5251C15.8185 10.8687 14.9283 10.5 14 10.5C13.0717 10.5 12.1815 10.8687 11.5251 11.5251C10.8687 12.1815 10.5 13.0717 10.5 14C10.5 14.9283 10.8687 15.8185 11.5251 16.4749C12.1815 17.1313 13.0717 17.5 14 17.5Z"
        stroke={getIconColor(colorMode)}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.8925 12.1275L21.6127 9.03587L23.3335 7.00004L21.0002 4.66671L18.976 6.39687L15.8178 5.09837L15.091 2.33337H12.8113L12.074 5.13454L8.98816 6.43537L7.00016 4.66671L4.66683 7.00004L6.362 9.08721L5.102 12.187L2.3335 12.8334V15.1667L5.13466 15.9309L6.4355 19.0167L4.66683 21L7.00016 23.3334L9.08966 21.63L12.13 22.8807L12.8335 25.6667H15.1668L15.8715 22.8819L18.9643 21.6009C19.48 21.9695 21.0002 23.3334 21.0002 23.3334L23.3335 21L21.6022 18.9584L22.8832 15.8644L25.6668 15.141V12.8334L22.8925 12.1275Z"
        stroke={getIconColor(colorMode)}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};