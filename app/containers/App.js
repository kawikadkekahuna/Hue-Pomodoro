import React, { Component } from 'react';
import type { Children } from 'react';
import NotificationsContainer from './Notifications';

export default class App extends Component {
  render() {
    return (
      <div>
        <NotificationsContainer />
        {this.props.children}
      </div>
    );
  }
}
