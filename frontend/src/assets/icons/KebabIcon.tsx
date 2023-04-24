import * as React from "react";
import { useColorMode } from "@chakra-ui/react";
import { getIconColor } from "../../common/utils/themeHelpers";


export const KebabIcon = () => {
    const { colorMode } = useColorMode();

    return (
    <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
            fill={getIconColor(colorMode)}
        />
    </svg>
    );
};
