// @flow
import type { actionType, pomodoroInitialState } from "../types/index";

export const START_POMODORO = "START_POMODORO";
export const END_POMODORO = "END_POMODORO";

const initialState = {
  timeTillFinish: 15,
  isCountingDown: false,
  isWorkMode: true,
  tickInitiated: false
};

export default function pomodoro(
  state: pomodoroInitialState = initialState,
  action: actionType
) {
  switch (action.type) {
    default:
      return state;
  }
}
