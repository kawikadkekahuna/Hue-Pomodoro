import glamorous from "glamorous";
import { lightState } from "node-hue-api";
import React, { Component } from "react";
import { Link } from "react-router";
import AppSettingsIcon from "material-ui/svg-icons/action/settings";
import LightSettingsIcon from "material-ui/svg-icons/action/lightbulb-outline";
import Timer from "./Timer";
import Button from "./Button";

const { Div } = glamorous;

export default class Pomodoro extends Component {
  render() {
    return (
      <div>
        <Div position="absolute" top="0" right="0">
          <Link to="/hue-config"><AppSettingsIcon /></Link>
          <Link to="/hue-config"><LightSettingsIcon /></Link>
        </Div>
        <Div>
          <Timer time={this.props.timeTillFinish} />
          <Div display="flex" justifyContent="center" alignItems="center">
            <Button
              className="pomodoroToggle"
              onClick={() => {
                this.props.handlePomodoroEvent();
              }}
              text={this.props.tickState}
            />
            <Button onClick={this.props.resetTimer} text="Reset" />
          </Div>
        </Div>
      </div>
    );
  }
}
