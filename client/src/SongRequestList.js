import React, { Component } from 'react';
import SongRequest from './SongRequest';
import axios from 'axios';

class SongRequestList extends Component {
  constructor(props) {
    super(props);
    this.state = { requests: null }
  }

  componentDidMount() {
    axios.get('/api/requests/party/' + this.props.partyId).then(res => {
      console.log(res.data);
      this.setState( { requests: res.data })
    })
  }

  render() {
    return (
      <div className="song-request-list">
        { (this.state.requests) ? this.renderRequests() : this.renderNoRequestsMessage() }
      </div>
    );
  }

  renderRequests() {
    return this.state.requests.map((request) => (
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
