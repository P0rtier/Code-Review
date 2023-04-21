import React from "react";
import { Route, Routes } from "react-router";
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


const App = () => {
  const background = useStyleConfig(StyledComponents.Background);

  return (
    <Box className={styles.appContainer} __css={background}>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<PrivateRoute Component={Home} />} />
          <Route path="home" element={<PrivateRoute Component={Home} />} />
          <Route path="stats" element={<PrivateRoute Component={Stats} />} />
          <Route path="reviewer" element={<PrivateRoute Component={ReviewerChoice} />} />
          <Route path="login" element={<AnonymouseRoute Component={Login} />} />
          <Route path="register" element={<AnonymouseRoute Component={Register} />} />
        </Route>
      </Routes>
      <ToastContainer position='bottom-right' hideProgressBar />
    </Box>
  );
};

export default App;
