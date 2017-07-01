import type { Map } from 'immutable';

export type actionType = {
  type: string,
};

export type Dispatch = (action: Action) => void;

export type pomodoroInitialState = Map;
