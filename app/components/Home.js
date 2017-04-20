// @flow
import React, { Component } from "react";
import { Link } from "react-router";
import styles from "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div>
          <Link to="/pomodoro">Pomodoro</Link>
          <Link to="/hue-config">Hue Configuration</Link>
        </div>
      </div>
    );
  }
}
