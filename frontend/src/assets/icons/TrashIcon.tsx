import * as React from "react";
import { useColorMode } from "@chakra-ui/react";
import { getIconColor } from "../../common/utils/helpers";


export const TrashIcon = () => {
    const { colorMode } = useColorMode();

    return (
        <svg
            width={28}
            height={28}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_2_8)">
                <path
                    d="M1.76398 7C1.76398 7.48533 1.93198 7.90533 2.26798 8.26C2.60398 8.61467 3.01464 8.78267 3.49998 8.764V22.764C3.49998 24.22 4.01331 25.452 5.03998 26.46C6.06664 27.468 7.30798 27.9813 8.76398 28H19.264C20.7013 28 21.9333 27.4867 22.96 26.46C23.9866 25.4333 24.5 24.2013 24.5 22.764V8.764C24.9853 8.764 25.396 8.596 25.732 8.26C26.068 7.924 26.2453 7.504 26.264 7C26.2826 6.496 26.1053 6.08533 25.732 5.768C25.3586 5.45067 24.948 5.28267 24.5 5.264H19.264C19.264 3.808 18.7506 2.56667 17.724 1.54C16.6973 0.513333 15.456 0 14 0C12.544 0 11.3026 0.513333 10.276 1.54C9.24931 2.56667 8.74531 3.808 8.76398 5.264H3.49998C3.01464 5.264 2.60398 5.432 2.26798 5.768C1.93198 6.104 1.76398 6.51467 1.76398 7ZM6.99998 22.764V8.764H21V22.764C21 23.2493 20.832 23.66 20.496 23.996C20.16 24.332 19.7493 24.5 19.264 24.5H8.76398C8.27864 24.5 7.85864 24.332 7.50398 23.996C7.14931 23.66 6.98131 23.2493 6.99998 22.764ZM8.76398 22.764H10.5V10.5H8.76398V22.764ZM12.264 22.764H15.764V10.5H12.264V22.764ZM12.264 5.264C12.264 4.77867 12.432 4.368 12.768 4.032C13.104 3.696 13.5146 3.51867 14 3.5C14.4853 3.48133 14.896 3.65867 15.232 4.032C15.568 4.40533 15.7453 4.816 15.764 5.264H12.264ZM17.5 22.764H19.264V10.5H17.5V22.764Z"
                    fill={getIconColor(colorMode)}
                />
            </g>
        </svg>
    );
};