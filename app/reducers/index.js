// @flow
import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import hue from "./hue";
import pomodoro from "./pomodoro";
import { reducer as notifications } from "react-notification-system-redux";

const rootReducer = combineReducers({
  hue,
  routing,
  notifications,
  pomodoro
});

export default rootReducer;
