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

export const isEmailValid = (email: string) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {  
     return true;
  }

  return false;
 }