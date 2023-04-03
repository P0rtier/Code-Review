import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import colors from "../../assets/styles/colors.module.scss";
import { mode } from "@chakra-ui/theme-tools";
import { PrimaryComponent, SecondaryComponent } from "./styledComponents";

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode(
          colors.lightPrimaryBackground,
          colors.darkPrimaryBackground
        )(props),
      },
    }),
  },
  components: {
    PrimaryComponent,
    SecondaryComponent,
  },
});

export default theme;
