import colors from "../../assets/styles/colors.module.scss";

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
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
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
  if (password.match(/^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%&? "]).*$/)) {
    return true;
  }
  return false;
}