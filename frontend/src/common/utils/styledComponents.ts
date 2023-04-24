import { defineStyleConfig, StyleFunctionProps } from "@chakra-ui/react";
import colors from "../../assets/styles/colors.module.scss";
import { mode } from "@chakra-ui/theme-tools";

export const PrimaryComponent = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    backgroundColor: mode(
      colors.lightComponentLayerBeige,
      colors.darkComponentLayerBeige
    )(props),
    boxShadow: colors.boxShadow,
    borderRadius: "10px",
  }),
});

export const SecondaryComponent = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    backgroundColor: mode(
      colors.lightComponentLayerDarkerBeige,
      colors.darkComponentLayerDarkerBeige
    )(props),
    boxShadow: colors.boxShadow,
    borderRadius: "10px",
  }),
});

export const PrimaryOrangeComponent = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    backgroundColor: mode(
      colors.lightComponentLayerOrange,
      colors.darkComponentLayerOrange
    )(props),
    boxShadow: colors.boxShadow,
    borderRadius: "10px",
  }),
});

export const Background = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    background: mode(colors.lightBackground, colors.darkBackground)(props),
    backgroundSize: "contain",
  }),
});

export const Navbar = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    background: mode(colors.lightNavbarLayer, colors.darkNavbarLayer)(props),
    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
  }),
});

export const ReviewHeader = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    color: mode(colors.lightTextSecondary, colors.darkTextSecondary)(props),
  }),
});

export const FilterBar = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    bg: mode(colors.lightFilterBarLayer, colors.darkFilterBarLayer)(props),
    boxShadow: colors.boxShadow,
    borderRadius: "10px",
  }),
});

export const DateRangePicker = (props: StyleFunctionProps) => {
  return {
      ".rdrDayNumber span": {
        color: mode(
          colors.lightTextPrimary,
          colors.darkTextPrimary
        )(props),
      },
      ".rdrDayPassive .rdrDayNumber span": {
        color: mode(
          colors.lightTextPrimary,
          colors.darkTextPrimary
        )(props),
        opacity: '0.5'
      },
      ".rdrWeekDay": {
        color: mode(
          colors.lightTextSecondary,
          colors.darkTextSecondary
        )(props),
        opacity: '0.7'
      },
      ".rdrDayToday .rdrDayNumber span:after": {
        bg: mode(
          colors.lightComponentLayerOrange,
          colors.darkComponentLayerOrange
        )(props),
      },
      ".rdrDayDisabled": {
        bg: mode(
          colors.lightComponentLayerOrange + "30",
          colors.darkComponentLayerOrange + "18"
        )(props),
      },
    }
}
