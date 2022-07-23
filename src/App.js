import './App.css';

import React,{useLayoutEffect} from "react";
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import { StylesProvider } from '@material-ui/core/styles';

import {BrowserRouter} from 'react-router-dom'
import {Route} from "react-router";
import Login from "./components/Login"
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

              <Route path={"/"} component={HomePage}/>
              <Route path={"/registerPage"} component={RegisterPage}/>
              <Route path={"/mainPage"} component={MainPage}/>

          </BrowserRouter>
        </CacheProvider>
      </StylesProvider>
  );
}

export default App;
