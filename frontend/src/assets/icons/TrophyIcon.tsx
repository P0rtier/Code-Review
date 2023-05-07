import * as React from "react";
import { useColorMode } from "@chakra-ui/react";
import { getIconColor } from "../../common/utils/helpers";

export const TrophyIcon = () => {
  const { colorMode } = useColorMode();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={getIconColor(colorMode)}
        fillRule="evenodd"
        d="M3.5 4a1.5 1.5 0 1 0 0 3H4V4h-.5ZM6 4v4a6 6 0 0 0 12 0V4H6Zm14 0v3h.5a1.5 1.5 0 0 0 0-3H20Zm-.062 5h.562a3.5 3.5 0 1 0 0-7h-17a3.5 3.5 0 1 0 0 7h.562A8.004 8.004 0 0 0 11 15.938v1.581L6.65 21H6a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2h-.65L13 17.52v-1.582A8.004 8.004 0 0 0 19.938 9ZM12 19.28 9.85 21h4.3L12 19.28Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
