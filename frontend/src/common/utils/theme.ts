import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import colors from "../../assets/styles/colors.module.scss";
import { mode } from "@chakra-ui/theme-tools";
import {
  Background,
  Navbar,
  PrimaryComponent,
  PrimaryOrangeComponent,
  SecondaryComponent,
} from "./styledComponents";
import fonts from "../../assets/styles/fonts.module.scss";

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode(
          colors.lightPrimaryBackground,
          colors.darkPrimaryBackground
        )(props),
        color: mode(
          colors.lightPrimaryFont, 
          colors.darkPrimaryFont
        )(props),
      },
    }),
  },
  components: {
    PrimaryComponent,
    SecondaryComponent,
    PrimaryOrangeComponent,
    Background,
    Navbar,
    Input: {
      variants: {
        search: {
          field: {
            bg: "#fdfdfe",
            borderRadius: "10px",
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
            focusBorderColor: "#00F2DA",
            fontFamily: fonts.robotoMono,
            fontWeight: "700",
            width: "95%",
            height: "3em",
            _hover: {
              bg: "#fdfdfe",
            },
          },
        },
      },
    },
    Button: {
      variants: {
        search: {
          bg: "#00F2DA",
          borderRadius: "10px",
          boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
          fontFamily: fonts.robotoMono,
          width: "20%",
          height: "3em",
          _hover: {
            bg: "#fdfdfe",
          },
          _active: {
            bg: "#4affed",
            borderColor: "#4affed",
          },
        },
        welcome:(props: StyleFunctionProps) => ({
          bg: mode(
            colors.lightPrimaryBackground,
            colors.darkPrimaryBackground
          )(props),
          borderRadius: "md",
          width: "100%",
          height: "2.5rem",
          boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
        }),
      },
    },
  },
});

export default theme;
