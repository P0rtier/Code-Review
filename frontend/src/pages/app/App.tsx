import React from "react";
import styles from "./App.module.scss";
import { Home } from "../home/Home";
import { Navbar } from "../../components/navbar/Navbar";
import { Stats } from "../stats/Stats";
import { ReviewerChoice } from "../reviewer-choice/ReviewerChoice";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../common/enums/StyledComponents";
import Login from "../login/Login";
import Register from "../register/Register";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "../../components/private-route/PrivateRoute";
import AnonymouseRoute from "../../components/anonymous-route/AnonymouseRoute";
import { ServerError } from "../server-error/ServerError";
import { NotFound } from "../not-found/NotFound";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <PrivateRoute Component={Home} />,
      },
      {
        path: "home",
        element: <PrivateRoute Component={Home} />,
      },
      {
        path: "stats",
        element: <PrivateRoute Component={Stats} />,
      },
      {
        path: "reviewer",
        element: <PrivateRoute Component={ReviewerChoice} />,
      },
      {
        path: "login",
        element: <AnonymouseRoute Component={Login} />,
      },
      {
        path: "register",
        element: <AnonymouseRoute Component={Register} />,
      },
      {
        path: "server-error",
        element: <ServerError />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
const App = () => {
  const background = useStyleConfig(StyledComponents.Background);

  return (
    <Box className={styles.appContainer} __css={background}>
      <RouterProvider router={router} />
      <ToastContainer position='bottom-right' hideProgressBar />
    </Box>
  );
};

export default App;
