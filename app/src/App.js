/**
 * src/App.js
 */
import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import UserScore from "./components/user/UserScore";
import Authenticated from './components/auth/Authenticated';


export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <Route path='/logout'> */}
            {/* <Logout /> */}
          {/* </Route> */}
          <Route path={"/login"}>
            <Login />
          </Route>
          <Authenticated>
            <Route path={"/"}>
              <UserScore />
            </Route>
          </Authenticated>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
