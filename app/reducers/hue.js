// @flow
import { lightState } from 'node-hue-api';
import {
  DISCOVER_LIGHTS,
  SET_HUE_CONFIG,
  SET_HUE_API,
  SET_HUE_LIGHTS,
  SET_HUE_GROUPS,
  REQUEST_POMODORO_WORK_LIGHT,
  REQUEST_POMODORO_REST_LIGHT,
  REQUEST_LIGHTS_OFF,
  REQUEST_LIGHTS_ON
} from '../actions/hue';

type actionType = {
  type: string
};

type initialState = {

};

function requestPomodoroWorkLight(state) {
  state.lights.forEach((light) => {
    state.api.setLightState(light.id, { rgb: [14, 139, 34] });
  });
  return state;
}

function requestPomodoroRestLight(state) {
  state.lights.forEach((light) => {
    state.api.setLightState(light.id, { rgb: [200, 255, 255] });
  });
  return state;
}

function requestLightsOn(state) {
  state.lights.forEach((light) => {
    state.api.setLightState(light.id, { on: true });
  });
  return state;
}

function requestLightsOff(state) {
  state.api.setLightState(2, { off: true });
  state.api.setLightState(3, { off: true });
}

function discoverLights(state, lights) {
  state.api.lights('2').off();
  return Object.assign(state, {
    lights
  });
}

function setHueConfig(state, bridge) {
  return Object.assign(state, {
    bridge
  });
}

function setHueApi(state, api) {
  return Object.assign(state, {
    api
  });
}

function setHueGroups(state, rroups) {
  return Object.assign(state, {
    groups
  });
}

function setHueLights(state, lights) {
  return Object.assign(state, {
    lights
  });
}

export default function hue(state: initialState = {}, action: actionType) {
  switch (action.type) {
    case DISCOVER_LIGHTS:
      return discoverLights(state, action.data);
    case SET_HUE_API:
      return setHueApi(state, action.data);
    case SET_HUE_CONFIG:
      return setHueConfig(state, action.data);
    case SET_HUE_GROUPS:
      return setHueGroups(state, action.data);
    case SET_HUE_LIGHTS:
      return setHueLights(state, action.data);
    case REQUEST_LIGHTS_OFF:
      return requestLightsOff(state);
    case REQUEST_LIGHTS_ON:
      return requestLightsOn(state);
    case REQUEST_POMODORO_REST_LIGHT:
      return requestPomodoroRestLight(state);
    case REQUEST_POMODORO_WORK_LIGHT:
      return requestPomodoroWorkLight(state);
    default:
      return state;
  }
}
