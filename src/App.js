import './App.css';

import React,{useLayoutEffect} from "react";
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import { StylesProvider } from '@material-ui/core/styles';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage"
import MainPage from "./pages/MainPage"

function App() {

  useLayoutEffect(() => {
    document.body.setAttribute("dir", "rtl");
  }, []);
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
  });

  return (
      <StylesProvider>
        <CacheProvider value={cacheRtl}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/loginPage" element={<LoginPage/>}/>
              <Route path="/registerPage" element={<RegisterPage/>}/>
              <Route path="/mainPage" element={<MainPage/>}/>
            </Routes>
          </BrowserRouter>
        </CacheProvider>
      </StylesProvider>
  );
}

export default App;
