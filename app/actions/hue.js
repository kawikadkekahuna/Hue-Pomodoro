// @flow
import { nupnpSearch, HueApi, lightState } from "node-hue-api";
import { batchActions } from "redux-batched-actions";
import Notifications from "react-notification-system-redux";

export const INIT_HUE_CONFIG = "INIT_HUE_CONFIG";
export const FIND_HUE_BRIDGE = "FIND_HUE_BRIDGE";
export const INIT_HUE_CONFIG_FAILED = "INIT_HUE_CONFIG_FAILED";
export const SET_HUE_API = "SET_HUE_API";
export const SET_HUE_CONFIG = "SET_HUE_CONFIG";
export const SET_HUE_GROUPS = "SET_HUE_GROUPS";
export const SET_HUE_LIGHTS = "SET_HUE_LIGHTS";
export const DISCOVER_LIGHTS = "DISCOVER_LIGHTS";
export const REQUEST_LIGHTS_ON = "REQUEST_LIGHTS_ON";
export const REQUEST_LIGHTS_OFF = "REQUEST_LIGHTS_OFF";
export const REQUEST_POMODORO_REST_LIGHT = "REQUEST_POMODORO_REST_LIGHT";
export const REQUEST_POMODORO_WORK_LIGHT = "REQUEST_POMODORO_WORK_LIGHT";

export function requestLightsOn() {
  return {
    type: REQUEST_LIGHTS_ON
  };
}

export function requestLightsOff() {
  return {
    type: REQUEST_LIGHTS_OFF
  };
}

export function requestPomodoroWorkLight() {
  return {
    type: REQUEST_POMODORO_WORK_LIGHT
  };
}

export function requestPomodoroRestLight() {
  return {
    type: REQUEST_POMODORO_REST_LIGHT
  };
}

function _setupHueFailed() {
  return {
    type: INIT_HUE_CONFIG_FAILED
  };
}

function _findBridge() {
  return {
    type: FIND_HUE_BRIDGE
  };
}

function findBridge() {
  return new Promise((resolve, reject) => {
    nupnpSearch()
      .then(bridge => {
        resolve(bridge[0]);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function initHueConfig() {
  return async dispatch => {
    dispatch(_findBridge());
    try {
      const bridge = await findBridge();
      const hueCredentials = {
        host: bridge.ipaddress,
        username: localStorage.getItem("id")
      };
      const api = new HueApi(hueCredentials.host, hueCredentials.username);
      dispatch({ type: SET_HUE_API, data: api });
      if (!hueCredentials.username) {
        const newUser = await api.registerUser(
          hueCredentials.host,
          hueCredentials.username
        );
        localStorage.setItem("host", bridge.ipaddress);
        localStorage.setItem("id", newUser);
      }
      const { lights } = await api.lights();
      dispatch({ type: SET_HUE_CONFIG, data: hueCredentials });
      dispatch({ type: SET_HUE_LIGHTS, data: lights });
      localStorage.setItem("lights", JSON.stringify(lights));
      dispatch(
        Notifications.success({
          title: "Yay!",
          message: "Successfully registered Hue Device!",
          position: "tr",
          autoDismiss: 3
        })
      );
    } catch (error) {
      dispatch(_setupHueFailed());
      dispatch(
        Notifications.error({
          title: "Oops, something went wrong",
          message: error.message,
          position: "tr",
          autoDismiss: 3
        })
      );
    }
  };
}
