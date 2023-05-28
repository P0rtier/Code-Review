import { defineStyleConfig, StyleFunctionProps } from "@chakra-ui/react";
import colors from "../../assets/styles/colors.module.scss";
import { mode } from "@chakra-ui/theme-tools";

export const PrimaryComponent = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    backgroundColor: mode(
      colors.lightComponentLayerPrimary,
      colors.darkComponentLayerPrimary
    )(props),
    boxShadow: mode(colors.lightBoxShadow, colors.darkBoxShadow)(props),
    borderRadius: "6px",
  }),
});

export const SecondaryComponent = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    backgroundColor: mode(
      colors.lightComponentLayerSecondary,
      colors.darkComponentLayerSecondary
    )(props),
    boxShadow: mode(colors.lightBoxShadow, colors.darkBoxShadow)(props),
    borderRadius: "10px",
  }),
});

export const AttentionComponent = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    backgroundColor: mode(
      colors.lightComponentLayerAttention,
      colors.darkComponentLayerAttention
    )(props),
    boxShadow: mode(colors.lightBoxShadow, colors.darkBoxShadow)(props),
    borderRadius: "6px",
  }),
});

export const Background = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    background: mode(colors.lightBackground, colors.darkBackground)(props),
    backgroundAttachment: "fixed",
  }),
});

export const Navbar = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    background: mode(colors.lightNavbarLayer, colors.darkNavbarLayer)(props),
    boxShadow: mode(colors.lightBoxShadow, colors.darkBoxShadow)(props),
    borderRadius: "6px",
  }),
});

export const ReviewHeader = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    color: mode(colors.lightTextSecondary, colors.darkTextSecondary)(props),
  }),
});

export const DateRangePicker = (props: StyleFunctionProps) => {
  return {
    ".rdrDayNumber span": {
      color: mode(colors.lightTextPrimary, colors.darkTextPrimary)(props),
    },
    ".rdrDayPassive .rdrDayNumber span": {
      color: mode(colors.lightTextPrimary, colors.darkTextPrimary)(props),
      opacity: "0.5",
    },
    ".rdrWeekDay": {
      color: mode(colors.lightTextSecondary, colors.darkTextSecondary)(props),
      opacity: "0.7",
    },
    ".rdrDayToday .rdrDayNumber span:after": {
      bg: mode(
        colors.lightComponentLayerAttention,
        colors.darkComponentLayerAttention
      )(props),
    },
    ".rdrDayDisabled": {
      bg: mode(
        colors.lightComponentLayerAttention + "30",
        colors.darkComponentLayerAttention + "30"
      )(props),
    },
  };
};
