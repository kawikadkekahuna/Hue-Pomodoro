// @flow
import { nupnpSearch, HueApi, lightState } from 'node-hue-api';
import { batchActions } from 'redux-batched-actions';

export const INIT_HUE_CONFIG = 'INIT_HUE_CONFIG';
export const FIND_HUE_BRIDGE = 'FIND_HUE_BRIDGE';
export const SET_HUE_API = 'SET_HUE_API';
export const SET_HUE_CONFIG = 'SET_HUE_CONFIG';
export const SET_HUE_GROUPS = 'SET_HUE_GROUPS';
export const SET_HUE_LIGHTS = 'SET_HUE_LIGHTS';
export const DISCOVER_LIGHTS = 'DISCOVER_LIGHTS';
export const REQUEST_LIGHTS_ON = 'REQUEST_LIGHTS_ON';
export const REQUEST_LIGHTS_OFF = 'REQUEST_LIGHTS_OFF';
export const REQUEST_POMODORO_REST_LIGHT = 'REQUEST_POMODORO_REST_LIGHT';
export const REQUEST_POMODORO_WORK_LIGHT = 'REQUEST_POMODORO_WORK_LIGHT';
export const START_POMODORO = 'START_POMODORO';
export const END_POMODORO = 'END_POMODORO';

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

function _startPomodoroTimer() {
  return {
    type: START_POMODORO
  };
}

export function startPomodoroTimer() {
  return (dispatch) => {
  }
}

export function endPomodoroTimer() {
  return {
    type: END_POMODORO
  };
}

function _findBridge(dispatch) {
  return {
    type: FIND_HUE_BRIDGE
  };
}

function findBridge() {
  return new Promise((resolve, reject) => {
    nupnpSearch()
    .then((bridge) => {
      resolve(bridge[0]);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

export function initHueConfig() {
  return (dispatch) => {
    dispatch(_findBridge(dispatch));
    findBridge()
      .then((bridge) => {
        const hueCredentials = {
          host: bridge.ipaddress,
          username: 'FBg5XaAJWdYchiBn5V0hMZzNFSJH-cXgNXsQz3zQ'
        };

        const api = new HueApi(hueCredentials.host, hueCredentials.username);
        api.lights().then(({ lights }) => {
          api.groups().then((groups) => {
            dispatch({ type: SET_HUE_API, data: api });
            dispatch({ type: SET_HUE_CONFIG, data: hueCredentials });
            dispatch({ type: SET_HUE_LIGHTS, data: lights });
            dispatch({ type: SET_HUE_GROUPS, data: lights });
          })
        });
    });
  };
}
