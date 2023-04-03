import { StyleFunctionProps, defineStyleConfig } from "@chakra-ui/react";
import colors from '../../assets/styles/colors.module.scss'
import { mode } from "@chakra-ui/theme-tools";

export const PrimaryComponent = defineStyleConfig({
    baseStyle: (props: StyleFunctionProps) => ({
        backgroundColor: mode(colors.lightPrimaryComponent, colors.darkPrimaryComponent)(props),
        boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '10px',
    }),
});

export const SecondaryComponent = defineStyleConfig({
    baseStyle: (props: StyleFunctionProps) => ({
        backgroundColor: mode(colors.lightSecondaryComponent, colors.darkSecondaryComponent)(props),
        boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '10px',
    }),
});