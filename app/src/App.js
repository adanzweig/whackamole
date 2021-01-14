/**
 * src/App.js
 */
import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Authenticated from './components/auth/Authenticated';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameScreens from "./components/game/GameScreens";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/logout'>
            <Logout />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Authenticated>
            <GameScreens />
          </Authenticated>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
