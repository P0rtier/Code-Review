import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';
import * as React from 'react';


const ToggleThemeButton = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const icon = colorMode === 'light' 
        ? <MoonIcon boxSize={6} /> 
        : <SunIcon boxSize={7} />

    return ( 
        <IconButton  
            variant='ghost'
            aria-label='toggle theme'
            size='sm'
            color='black'
            _hover={{}}
            _active={{}}
            icon={icon}
            onClick={toggleColorMode}
        />
     );
}
 
export default ToggleThemeButton;