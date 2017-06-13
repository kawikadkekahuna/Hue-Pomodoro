import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestLightsOn,
  requestLightsOff,
  requestPomodoroWorkLight,
  requestPomodoroRestLight
} from "../actions/hue";
import Pomodoro from "../components/Pomodoro";

const ONE_SECOND = 1000;

class PomodoroContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTillFinish: this.props.workDuration,
      isCountingDown: false,
      isWorkMode: true,
      tickInitiated: false
    };
  }

  toggleRestPeriod = () => {
    this.props.requestPomodoroRestLight();
    this.setState(() => ({
      timeTillFinish: this.props.restDuration,
      isWorkMode: false
    }));
  };

  toggleWorkPeriod = () => {
    this.props.requestPomodoroWorkLight();
    this.setState(() => ({
      timeTillFinish: this.props.workDuration,
      isWorkMode: true
    }));
  };

  tick = () => {
    if (this.state.timeTillFinish === 0) {
      if (this.state.isWorkMode) {
        this.toggleRestPeriod();
      } else {
        this.toggleWorkPeriod();
      }
    }
    if (this.state.isCountingDown) {
      this.setState(() => ({
        isCountingDown: true,
        timeTillFinish: --this.state.timeTillFinish
      }));
    }
  };

  startTimer = () => {
    const intervalId = setInterval(this.tick, ONE_SECOND);
    this.setState(() => ({
      intervalId,
      isCountingDown: true,
      tickInitiated: true
    }));
  };

  pauseTimer = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      isCountingDown: false,
      intervalId: null
    });
  };

  getTickState = () => {
    return !this.state.intervalId && !this.state.tickInitiated
      ? "Start Timer"
      : this.state.intervalId && this.state.isCountingDown ? "Pause" : "Resume";
  };

  getPomodoroEventHandler = () => {
    switch (this.getTickState()) {
      case "Pause": {
        return this.pauseTimer;
      }
      case "Resume": {
        return this.toggleTimer;
      }
      case "Start Timer": {
        return this.startTimer;
      }
      default: {
        return;
      }
    }
  };

  resetTimer = () => {
    this.setState({
      timeTillFinish: this.props.workDuration,
      isCountingDown: false,
      intervalId: null,
      isWorkMode: true,
      tickInitiated: false
    });
  };

  toggleTimer = () => {
    if (this.state.tickInitiated && this.state.isCountingDown) {
      this.pauseTimer();
    } else {
      const intervalId = setInterval(this.tick, ONE_SECOND);
      this.setState({
        intervalId,
        isCountingDown: true
      });
    }
  };

  render() {
    return (
      <Pomodoro
        tickState={this.getTickState()}
        toggleTimer={this.toggleTimer}
        resetTimer={this.resetTimer}
        handlePomodoroEvent={this.getPomodoroEventHandler()}
        timeTillFinish={this.state.timeTillFinish}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    restDuration: 500,
    workDuration: 1500
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      requestLightsOn,
      requestLightsOff,
      requestPomodoroWorkLight,
      requestPomodoroRestLight
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroContainer);
