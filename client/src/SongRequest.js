import React, { Component } from 'react';
import Button from './Button';
import './SongRequest.css';

class SongRequest extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="song-request">
        <div className="song-request-details float-left">
          <span className="song-name">{this.props.request.song.name}</span>
          <span className="song-artist"> - {this.props.request.song.artist}</span>
        </div>
        <div className="song-request-buttons float-right">
          <Button kind="secondary">NO</Button>
          <Button kind="primary">YES</Button>
        </div>
      </div>
    );
  }
}

export default SongRequest;
