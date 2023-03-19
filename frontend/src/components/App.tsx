import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import styles from './App.module.scss';
import Home from './home/Home';
import Navbar from './navbar/Navbar';
import Stats from './stats/Stats';

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='stats' element={<Stats />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
