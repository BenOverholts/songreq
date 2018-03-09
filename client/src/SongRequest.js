import React, { Component } from 'react';
import Button from './Button';
import axios from 'axios';
import './SongRequest.css';

class SongRequest extends Component {
  constructor(props) {
    super(props);

    this.handleApprove = this.handleApprove.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }

  handleApprove() {
    console.log('Approve request: ' + this.props.request.id);

    axios.post('/api/requests/approve/' + this.props.request.id)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleReject() {
    console.log('Reject request: ' + this.props.request.id);

    axios.post('/api/requests/reject/' + this.props.request.id)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="song-request">
        <div className="song-request-details float-left">
          <span className="song-name">{this.props.request.song.name}</span>
          <span className="song-artist"> - {this.props.request.song.artist}</span>
        </div>
        <div className="song-request-buttons float-right">
          <Button kind="secondary" onClick={this.handleReject}>NO</Button>
          <Button kind="primary"onClick={this.handleApprove}>YES</Button>
        </div>
      </div>
    );
  }
}

export default SongRequest;
