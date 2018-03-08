import React, { Component } from 'react';

import asPage from './Page';
import SearchResultList from './SearchResultList';
import InlineSearchBar from './InlineSearchBar';

class SongSearch extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);

    this.state = { query: null, results: null };
  }

  search(query) {
    console.log(`Searching Spotify for ${query}`);
    // TODO call API to get actual results

    this.setState( { query: query, results: null })
  }

  render() {
    return (
      <div className="song-search">
        <h3>Request a Song</h3>
        <InlineSearchBar onSubmit={this.search} placeholder="Search for a song..." >Search</InlineSearchBar>
        { this.renderResults() }
      </div>
    );
  }

  renderResults() {
    return (this.state.query) ? <SearchResultList results={this.state.results} query={this.state.query}/> : null;
  }
}

export default asPage(SongSearch);
