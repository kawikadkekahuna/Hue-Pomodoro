// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import hue from './hue';

const rootReducer = combineReducers({
  hue,
  routing
});

export default rootReducer;
