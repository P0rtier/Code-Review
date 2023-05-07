import * as React from "react";
import { useColorMode } from "@chakra-ui/react";
import { getIconColor } from "../../common/utils/helpers";

export const TrashIcon = () => {
  const { colorMode } = useColorMode();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={35}
      height={35}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={getIconColor(colorMode)}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 10v6m4-6v6m4-10v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6M4 6h16m-5 0V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v1"
      />
    </svg>
  );
};
