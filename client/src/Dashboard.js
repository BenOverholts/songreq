import React, { Component } from 'react';
import './Dashboard.css';
import Button from './Button';
import List from './List';
import asPage from './Page';

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <div className="row">
          <div className="col-sm-12 text-center">
            <h3>Manage Song Requests</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 text-center bottom-margin-20">
            <Button kind="secondary" className="refresh">Refresh</Button>
          </div>
        </div>
        <List/> { /* TODO HOC listOf(Component) and HOC withSubscription(Component, DataSource) */ }
        <div className="row">
          <div className="col-sm-12">
            <div className="text-center pad-top">
              <h3>Share With Attendees</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default asPage(Dashboard);
