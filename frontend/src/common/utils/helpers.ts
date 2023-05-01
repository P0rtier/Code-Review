import colors from "../../assets/styles/colors.module.scss";
import { emailRegex, passwordRegex } from "./constants";

export const isLightMode = (colorMode: string) => {
  return colorMode === "light";
};

export const isDarkMode = (colorMode: string) => {
  return colorMode === "dark";
};

export const getIconColor = (colorMode: string) => {
  return isLightMode(colorMode)
    ? colors.lightTextPrimary
    : colors.darkTextPrimary;
};

export const getComponentColorOrange = (colorMode: string): string => {
  return isLightMode(colorMode)
    ? colors.lightComponentLayerOrange
    : colors.darkComponentLayerOrange;
};

export const getNavbarBlueColor = (colorMode: string) => {
  return isLightMode(colorMode)
    ? colors.lightNavbarLayer
    : colors.darkNavbarLayer;
};

export const isEmailValid = (email: string) => {
  if (email.match(emailRegex)) {
    return true;
  }
  return false;
}

export const formatDateShort = (date: Date) => {
  const pad = (i: number) => (i < 10) ? "0" + i : "" + i;

  return date.getFullYear() + "-" +
    pad(1 + date.getMonth()) + "-" +
    pad(date.getDate());
}

export const isPasswordValid = (password: string) => {
  if (password.match(passwordRegex)) {
    return true;
  }
  return false;
}