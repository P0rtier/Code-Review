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

const App = () => {
  const background = useStyleConfig(StyledComponents.Background);

  return (
    <Box className={styles.appContainer} __css={background}>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="stats" element={<Stats />} />
          <Route path="reviewer" element={<ReviewerChoice />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;
