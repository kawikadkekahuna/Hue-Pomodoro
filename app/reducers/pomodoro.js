import { Map } from 'immutable';

export const START_POMODORO = 'START_POMODORO';
export const END_POMODORO = 'END_POMODORO';

const initialState = new Map({
  timeTillFinish: 15,
  isCountingDown: false,
  isWorkMode: true,
  tickInitiated: false,
});

export default function pomodoro(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
