import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/app/App';
import { BrowserRouter } from "react-router-dom";
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'

const { Menu } = chakraTheme.components
const theme = extendBaseTheme({
  components: {
    Menu,
  },
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ChakraBaseProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraBaseProvider>
    </React.StrictMode>
);
