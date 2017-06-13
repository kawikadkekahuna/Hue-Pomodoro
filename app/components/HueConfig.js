// @flow
import React, { Component } from "react";
import { Link } from "react-router";
import BackIcon from "material-ui/svg-icons/navigation/arrow-back";

export default class HueConfig extends Component {
  static propTypes = {};

  componentWillMount() {
    console.log("mounted");
  }

  render() {
    return (
      <div>
        <Link to="/pomodoro"><BackIcon /></Link>
        <button onClick={this.props.initHueConfig}>Detect config</button>
      </div>
    );
  }
}
