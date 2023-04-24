import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import colors from "../../assets/styles/colors.module.scss";
import { mode } from "@chakra-ui/theme-tools";
import {
  Background,
  FilterBar,
  Navbar,
  PrimaryComponent,
  PrimaryOrangeComponent,
  ReviewHeader,
  SecondaryComponent,
  DateRangePicker
} from "./styledComponents";
import fonts from "../../assets/styles/fonts.module.scss";

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode(
          colors.lightBackgroundLayerPrimary,
          colors.darkBackgroundLayerPrimary
        )(props),
        color: mode(colors.lightTextPrimary, colors.darkTextPrimary)(props),
      },
      ...DateRangePicker(props),
    })
  },
  components: {
    PrimaryComponent,
    SecondaryComponent,
    PrimaryOrangeComponent,
    Background,
    Navbar,
    ReviewHeader,
    FilterBar,
    Input: {
      variants: {
        search: (props: StyleFunctionProps) => ({
          field: {
            bg: mode(
              colors.lightComponentLayerBeige,
              colors.darkComponentLayerBeige
            )(props),
            borderRadius: "10px",
            boxShadow: colors.boxShadow,
            focusBorderColor: colors.lightFilterBarLayer,
            fontFamily: fonts.robotoMono,
            fontWeight: "700",
            width: "95%",
            height: "3em",
            _hover: {
              bg: mode(
                colors.lightFilterBarLayer,
                colors.darkFilterBarLayer
              )(props),
            },
          },
        }),
        auth: (props: StyleFunctionProps) => ({
          field: {
            borderRadius: "10px",
            boxShadow: colors.boxShadow,
            fontFamily: fonts.robotoMono,
            fontWeight: "700",
            bg: mode(
              colors.lightComponentLayerOrange,
              colors.darkComponentLayerOrange
            )(props),
          },
        }),
      },
    },
    Button: {
      variants: {
        search: (props: StyleFunctionProps) => ({
          bg: mode(
            colors.lightFilterBarLayer,
            colors.darkFilterBarLayer
          )(props),
          borderRadius: "10px",
          boxShadow: colors.boxShadow,
          fontFamily: fonts.robotoMono,
          height: "3em",
          _hover: {
            bg: mode(
              colors.lightBackgroundLayerPrimary,
              colors.darkBackgroundLayerPrimary
            )(props),
          },
          _active: {
            bg: colors.lightComponentLayerDarkerBeige,
            borderColor: colors.darkComponentLayerDarkerBeige,
          },
        }),
        welcome: (props: StyleFunctionProps) => ({
          bg: mode(
            colors.lightBackgroundLayerSecondary,
            colors.darkBackgroundLayerSecondary
          )(props),
          borderRadius: "md",
          width: "100%",
          height: "2.5rem",
          boxShadow: colors.boxShadow,
        }),
        auth: (props: StyleFunctionProps) => ({
          bg: mode(
            colors.lightBackgroundLayerPrimary,
            colors.darkBackgroundLayerPrimary
          )(props),
          borderRadius: "md",
          width: "30%",
          height: "2.5rem",
          boxShadow: colors.boxShadow,
        }),
      },
    },
    Drawer: {
      baseStyle: (props: StyleFunctionProps) => ({
        dialog: {
          bg: mode(
            colors.lightBackgroundLayerPrimary,
            colors.darkBackgroundLayerSecondary
          )(props),
        },
      }),
    },
    Popover: {
      baseStyle: (props: StyleFunctionProps) => ({
        content: {
          bg: mode(
            colors.lightBackgroundLayerSecondary,
            colors.darkBackgroundLayerSecondary
          )(props),
        },
      }),
    },
  },
});

export default theme;
