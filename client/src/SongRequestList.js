import React, { Component } from 'react';
import SongRequest from './SongRequest';

class SongRequestList extends Component {

  render() {
    return (
      <div className="song-request-list">
        { (this.props.requests) ? this.renderRequests() : this.renderNoRequestsMessage() }
      </div>
    );
  }

  renderRequests() {
    return this.props.requests.map((request) => (
      <div key={request.id} className="row">
        <div className="col-12">
          <SongRequest request={request} />
        </div>
      </div>
    ))
  }

  // TODO Animate this
  renderNoRequestsMessage() {
    return (
      <div className="row">
        <div className="col-12 text-center pad-top">
          <em>Waiting for guests to request songs...</em>
        </div>
      </div>
    );
  }
}

export default SongRequestList;
