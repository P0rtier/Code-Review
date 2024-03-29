import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/app/App";
import { ChakraBaseProvider } from "@chakra-ui/react";
import theme from "./common/utils/theme";
import { UserProvider } from "./common/providers/UserProvider";
import { NotificationProvider } from "./common/providers/NotificationsProvider";
import "react-toastify/dist/ReactToastify.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <UserProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </UserProvider>
    </ChakraBaseProvider>
  </React.StrictMode>
);
