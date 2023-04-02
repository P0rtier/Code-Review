import chakraTheme from '@chakra-ui/theme';
import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";

const { Menu } = chakraTheme.components;
const theme = extendTheme({
    components: {
        Menu,
    },
});


export default theme;