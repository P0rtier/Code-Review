import { defineStyleConfig, StyleFunctionProps } from "@chakra-ui/react";
import colors from "../../assets/styles/colors.module.scss";
import { mode } from "@chakra-ui/theme-tools";

export const PrimaryComponent = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    backgroundColor: mode(
      colors.lightPrimaryComponent,
      colors.darkPrimaryComponent
    )(props),
    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
  }),
});

export const SecondaryComponent = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    backgroundColor: mode(
      colors.lightSecondaryComponent,
      colors.darkSecondaryComponent
    )(props),
    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
  }),
});

export const PrimaryOrangeComponent = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    backgroundColor: mode(
      colors.lightPrimaryOrangeComponent,
      colors.darkPrimaryOrangeComponent
    )(props),
    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
  }),
});

export const Background = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    background: mode(colors.lightBackground, colors.darkBackground)(props),
    backgroundSize: "cover",
  }),
});

export const Navbar = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    background: mode(colors.lightNavbarBlue, colors.darkNavbarBlue)(props),
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.3)',
    borderRadius: '10px'
  }),
});