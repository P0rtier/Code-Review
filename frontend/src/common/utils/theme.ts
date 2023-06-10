import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import colors from "../../assets/styles/colors.module.scss";
import { mode } from "@chakra-ui/theme-tools";
import {
  Background,
  Navbar,
  PrimaryComponent,
  AttentionComponent,
  ReviewHeader,
  SecondaryComponent,
  DateRangePicker,
} from "./styledComponents";
import fonts from "../../assets/styles/fonts.module.scss";

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode(colors.lightTextPrimary, colors.darkTextPrimary)(props),
        backgroundColor: mode(
          colors.lightBackground,
          colors.darkBackground
        )(props),
      },
      ...DateRangePicker(props),
    }),
  },
  components: {
    PrimaryComponent,
    SecondaryComponent,
    AttentionComponent,
    Background,
    Navbar,
    ReviewHeader,
    Input: {
      variants: {
        search: (props: StyleFunctionProps) => ({
          field: {
            bg: mode(
              colors.lightComponentLayerPrimary,
              colors.darkComponentLayerPrimary
            )(props),
            borderRadius: "6px",
            boxShadow: mode(colors.lightBoxShadow, colors.darkBoxShadow)(props),
            focusBorderColor: colors.lightComponentLayerPrimary,
            fontFamily: fonts.fontSecondary,
            fontWeight: "700",
            width: "100%",
            height: "3em",
            _hover: {
              bg: mode(
                colors.lightComponentLayerAttention,
                colors.darkComponentLayerAttention
              )(props),
            },
          },
        }),
        auth: (props: StyleFunctionProps) => ({
          field: {
            borderRadius: "6px",
            boxShadow: mode(colors.lightBoxShadow, colors.darkBoxShadow)(props),
            fontFamily: fonts.fontSecondary,
            fontWeight: "700",
            bg: mode(
              colors.lightComponentLayerAttention,
              colors.darkComponentLayerAttention
            )(props),
          },
        }),
      },
    },
    Button: {
      variants: {
        search: (props: StyleFunctionProps) => ({
          bg: mode(
            colors.lightComponentLayerPrimary,
            colors.darkComponentLayerPrimary
          )(props),
          borderRadius: "6px",
          boxShadow: mode(colors.lightBoxShadow, colors.darkBoxShadow)(props),
          fontFamily: fonts.fontSecondary,
          height: "3em",
          _hover: {
            bg: mode(colors.lightNavbarLayer, colors.darkNavbarLayer)(props),
          },
          _active: {
            opacity: "0.7",
          },
        }),
        welcome: (props: StyleFunctionProps) => ({
          bg: mode(
            colors.lightComponentLayerSecondary,
            colors.darkComponentLayerSecondary
          )(props),
          borderRadius: "md",
          width: "100%",
          height: "2.5rem",
          boxShadow: mode(colors.lightBoxShadow, colors.darkBoxShadow)(props),
          _hover: {
            bg: mode(colors.lightNavbarLayer, colors.darkNavbarLayer)(props),
          },
        }),
        auth: (props: StyleFunctionProps) => ({
          bg: mode(
            colors.lightComponentLayerPrimary,
            colors.darkComponentLayerPrimary
          )(props),
          borderRadius: "md",
          width: "30%",
          height: "2.5rem",
          boxShadow: mode(colors.lightBoxShadow, colors.darkBoxShadow)(props),
          _hover: {
            bg: mode(colors.lightNavbarLayer, colors.darkNavbarLayer)(props),
          },
          _active: {
            opacity: "0.7",
          },
        }),
      },
    },
    Drawer: {
      baseStyle: (props: StyleFunctionProps) => ({
        dialog: {
          bg: mode(
            colors.lightBackground,
            colors.darkComponentLayerSecondary
          )(props),
        },
      }),
    },
    Popover: {
      baseStyle: (props: StyleFunctionProps) => ({
        content: {
          bg: mode(
            colors.lightComponentLayerPrimary,
            colors.darkComponentLayerPrimary
          )(props),
          boxShadow: mode(colors.lightBoxShadow, colors.darkBoxShadow)(props),
        },
      }),
    },
  },
});

export default theme;
