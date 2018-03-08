import React, { Component } from 'react';
import Button from './Button';
import './SearchResult.css';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.requestSong = this.requestSong.bind(this);
  }

  requestSong() {
    console.log('Requesting ' + this.props.result.name + ' by ' + this.props.result.artist);
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
