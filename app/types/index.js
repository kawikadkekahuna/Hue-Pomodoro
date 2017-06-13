export type actionType = {
  type: string
};

export type Dispatch = (action: Action) => void;

export type pomodoroInitialState = {
  timeTillFinish: number,
  isCountingDown: boolean,
  isWorkMode: boolean,
  tickInitiated: boolean
};
