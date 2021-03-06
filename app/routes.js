// @flow
import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./containers/App";
import PomodoroPage from "./containers/PomodoroPage";
import HueConfigPage from "./containers/HueConfigPage";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PomodoroPage} />
    <Route path="/pomodoro" component={PomodoroPage} />
    <Route path="/hue-config" component={HueConfigPage} />
  </Route>
);
