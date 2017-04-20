// @flow
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import styles from "./Home.css";

export default class HueConfig extends Component {
  static propTypes = {};

  componentWillMount() {
    console.log("mounted");
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <Link to="/">Home</Link>
        <div>
          <h1>API KEY</h1>
          <button onClick={this.props.initHueConfig}>Detect config</button>
        </div>
      </div>
    );
  }
}
