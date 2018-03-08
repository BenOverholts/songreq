import React, { Component } from 'react';
import './Dashboard.css';
import asPage from './Page';
import SongRequestList from './SongRequestList';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      partyId: cookies.get('partyId')
    }
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="row">
          <div className="col-sm-12 text-center pad-top">
            <h3>Manage Song Requests</h3>
          </div>
        </div>
        <SongRequestList partyId={this.state.partyId} />
        <div className="row">
          <div className="col-sm-12">
            <div className="text-center pad-top">
              <h3>Share With Attendees</h3>
            </div>
          </div>
        </div>
        { /* TODO share link */ }
      </div>
    );
  }
}

export default asPage(Dashboard);
