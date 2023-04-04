import colors from "../../assets/styles/colors.module.scss";

export const isLightMode = (colorMode: string) => {
    return colorMode === "light";
};

export const isDarkMode = (colorMode: string) => {
    return colorMode === "dark";
};

export const getIconColor = (colorMode: string) => {
    return isLightMode(colorMode) ? colors.lightPrimaryFont : colors.darkPrimaryFont;
}