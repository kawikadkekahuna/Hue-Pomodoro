// @flow
import moment from "moment";
import { lightState } from "node-hue-api";
import React, { Component } from "react";
import { Link } from "react-router";
import styles from "./Home.css";

const ONE_SECOND = 1000;

export default class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTillFinish: this.props.workDuration,
      isCountingDown: false,
      isWorkMode: true
    };
  }

  toggleRestPeriod = () => {
    this.props.requestPomodoroRestLight();
    return this.setState(() => ({
      timeTillFinish: this.props.restDuration,
      isWorkMode: false
    }));
  };

  toggleWorkPeriod = () => {
    this.props.requestPomodoroWorkLight();
    return this.setState(() => ({
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
    return this.setState(() => ({
      isCountingDown: true,
      timeTillFinish: this.state.timeTillFinish - 1
    }));
  };

  startTimer = () => {
    const intervalId = setInterval(this.tick, ONE_SECOND);
    return this.setState(() => ({
      intervalId
    }));
  };

  pauseTimer = () => {
    this.setState(nextState => {
      clearInterval(nextState.intervalId);
      return {
        isCountingDown: false,
        intervalId: null
      };
    });
  };

  resetTimer = () => {
    this.setState(nextState => {
      return {
        timeTillFinish: this.props.workDuration,
        isCountingDown: false,
        intervalId: null,
        isWorkMode: true
      };
    });
  };

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <Link to="/">Home</Link>
        <div>
          <button onClick={this.startTimer}>Start Timer</button>
          <button onClick={this.pauseTimer}>Pause</button>
          <button onClick={this.resetTimer}>Reset</button>
          <button onClick={this.props.requestLightsOn}>Lights on</button>
          <button onClick={this.props.requestLightsOff}>Lights off</button>
          <h1>Timer: {this.state.timeTillFinish}</h1>
        </div>
      </div>
    );
  }
}
