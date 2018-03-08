import React, { Component } from 'react';
import Button from './Button';
import axios from 'axios';
import './SearchResult.css';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.requestSong = this.requestSong.bind(this);
  }

  requestSong() {
    console.log('Requesting ' + this.props.result.name + ' by ' + this.props.result.artist);

    axios.post('/api/requests', {
        partyId: this.props.partyId,
        song: {
          uri: this.props.result.uri,
          name: this.props.result.name,
          artist: this.props.result.artist,
          artUrl: this.props.result.artUrl
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 search-result">
          <Button kind="secondary" className="song-button" onClick={this.requestSong}>
            <span className="song-name">{this.props.result.name}</span>
            <span className="song-artist"> - {this.props.result.artist}</span>
          </Button>
        </div>
      </div>
    );
  }
}

export default SearchResult;
