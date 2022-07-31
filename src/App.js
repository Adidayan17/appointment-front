import './App.css';

import React, {useEffect, useLayoutEffect, useState} from "react";
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import { StylesProvider } from '@material-ui/core/styles';

import {BrowserRouter, Redirect} from 'react-router-dom'
import {Route} from "react-router";

import HomePage from "./pages/HomePage";
import PersonalPage from "./pages/PersonalPage"
import MainPage from "./pages/MainPage"
import Cookies from "universal-cookie/es6";


function App() {

    const[loggedIn ,setLoggedIn] = useState(false)

  useLayoutEffect(() => {
    document.body.setAttribute("dir", "rtl");
  }, []);
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
  });

    useEffect(()=>{

        const cookies =new Cookies()
        const token =cookies.get("token")
        if(token && token.length >0){
            setLoggedIn(true)

        }

    },[])
  return (
      <div className={`${"App"} ${"body"}`}>
      <StylesProvider>
        <CacheProvider value={cacheRtl}>
            {loggedIn ?    <BrowserRouter>
                    <Redirect to={"/mainPage"}/>
                    <Route path={"/mainPage"} component={MainPage}/>
                <Route path={"/personalPage"} component={PersonalPage}/>
            </BrowserRouter>:
                <BrowserRouter>
                    <Route path={"/"} component={HomePage}/>
                </BrowserRouter>
            }
          {/*<BrowserRouter>*/}
          {/*    <Route path={"/"} component={HomePage}/>*/}
          {/*    <Route path={"/mainPage"} component={MainPage}/>*/}
          {/*    <Route path={"/personalPage"} component={PersonalPage}/>*/}
          {/*</BrowserRouter>*/}
        </CacheProvider>
      </StylesProvider>
      </div>
  );
}

export default App;


// if (cookies.get("token") && cookies.get("token").length > 0) {
//     this.setState({loggedIn: true})