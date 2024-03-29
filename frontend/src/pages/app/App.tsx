import React from "react";
import styles from "./App.module.scss";
import { Home } from "../home/Home";
import { Navbar } from "../../components/navbar/Navbar";
import { ReviewerChoice } from "../reviewer-choice/ReviewerChoice";
import { Leaderboard } from "../leaderboard/Leaderboard";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../common/enums/StyledComponents";
import Login from "../login/Login";
import Register from "../register/Register";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "../../components/private-route/PrivateRoute";
import AnonymousRoute from "../../components/anonymous-route/AnonymousRoute";
import { ServerError } from "../server-error/ServerError";
import { NotFound } from "../not-found/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StatsContainer } from "../stats/StatsContainer";

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
        element: <PrivateRoute Component={StatsContainer} />,
      },
      {
        path: "reviewer/:id",
        element: <PrivateRoute Component={ReviewerChoice} />,
      },
      {
        path: "leaderboard",
        element: <PrivateRoute Component={Leaderboard} />,
      },
      {
        path: "login",
        element: <AnonymousRoute Component={Login} />,
      },
      {
        path: "register",
        element: <AnonymousRoute Component={Register} />,
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
      <ToastContainer position="bottom-right" hideProgressBar />
    </Box>
  );
};

export default App;
