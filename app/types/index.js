export type actionType = {
  type: string
};

export type pomodoroInitialState = {
  timeTillFinish: number,
  isCountingDown: boolean,
  isWorkMode: boolean,
  tickInitiated: boolean
};
