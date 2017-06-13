import glamorous from "glamorous";
import React, { Component } from "react";

const { H1, Div } = glamorous;

export default class Timer extends Component {
  constructor(props) {
    super(props);
  }

  getMinutes(seconds) {
    return Math.floor(seconds / 60);
  }

  getSeconds(totalSeconds) {
    return totalSeconds % 60 ? totalSeconds % 60 : "00";
  }

  render() {
    return (
      <Div
        className="timer-group"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Div className="face">
          <H1 fontSize="20em" id="lazy">
            {this.getMinutes(this.props.time)}
            :
            {this.getSeconds(this.props.time)}
          </H1>
        </Div>
      </Div>
    );
  }
}
