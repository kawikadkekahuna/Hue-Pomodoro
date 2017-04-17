// @flow
import moment from 'moment';
import { lightState } from 'node-hue-api';
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


export default class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTillFinish: 5,
      isCountingDown: false,
      isWorkMode: true
    };
  }

  startTimer = () => {
    this.props.requestPomodoroWorkLight();
    const intervalId = setInterval(() => {
      if (this.state.timeTillFinish === 0) {
        if (this.state.isWorkMode) {
          this.props.requestPomodoroRestLight();
          return this.setState(() => ({
            timeTillFinish: 3,
            isWorkMode: false
          }));
        } else {
          this.props.requestPomodoroWorkLight();
          return this.setState(() => ({
            timeTillFinish: 5,
            isWorkMode: true
          }));
        }
      }
      return this.setState(() => ({
        isCountingDown: true,
        intervalId,
        timeTillFinish: this.state.timeTillFinish - 1
      }));
    }, 1000);
  }

  pauseTimer = () => {
    this.setState((nextState) => {
      clearInterval(nextState.intervalId);
      return {
        isCountingDown: false,
        intervalId: null
      };
    });
  }

  resetTimer = () => {
    this.setState((nextState) => {
      return {
        timeTillFinish: 5,
        isCountingDown: false,
        intervalId: null
      };
    });
  }

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
