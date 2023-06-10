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
    backgroundColor: mode(colors.lightBackground, colors.darkBackground)(props),
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
      filter: "auto",
      invert: mode("0", "1")(props),
    },
    ".rdrWeekDay": {
      filter: "auto",
      invert: mode("0", "1")(props),
    },
    ".rdrDayNumber span:after": {
      filter: "auto",
      invert: mode("0", "1")(props),
    },
    ".rdrDayDisabled": {
      bg: mode(
        colors.lightComponentLayerAttention + "30",
        colors.darkComponentLayerAttention + "30"
      )(props),
    },
    ".rdrDateDisplayWrapper": {
      bg: mode(
        colors.lightComponentLayerSecondary,
        colors.darkComponentLayerSecondary
      )(props),
    },
    ".rdrDateDisplayItem": {
      bg: mode(
        colors.lightComponentLayerPrimary,
        colors.darkComponentLayerPrimary
      )(props),
    },
    ".rdrDateDisplayItem input": {
      color: mode(colors.lightTextPrimary, colors.darkTextPrimary)(props),
    },
    ".rdrNextPrevButton": {
      bg: mode(
        colors.lightComponentLayerAttention,
        colors.darkComponentLayerAttention
      )(props),
    },
    ".rdrNextPrevButton i": {
      filter: "auto",
      invert: mode("0", "1")(props),
    },
    ".rdrMonthAndYearWrapper": {
      bg: mode(
        colors.lightComponentLayerSecondary,
        colors.darkComponentLayerSecondary
      )(props),
    },
    ".rdrMonthsVertical": {
      bg: mode(
        colors.lightComponentLayerSecondary,
        colors.darkComponentLayerSecondary
      )(props),
    },
    ".rdrMonthPicker select": {
      filter: "auto",
      invert: mode("0", "1")(props),
    },
    ".rdrYearPicker select": {
      filter: "auto",
      invert: mode("0", "1")(props),
    },
  };
};
