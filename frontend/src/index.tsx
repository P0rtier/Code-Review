import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/app/App";
import { BrowserRouter } from "react-router-dom";
import { ChakraBaseProvider } from "@chakra-ui/react";
import theme from "./common/utils/theme";
import { UserProvider } from "./common/providers/UserProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </ChakraBaseProvider>
  </React.StrictMode>
);
