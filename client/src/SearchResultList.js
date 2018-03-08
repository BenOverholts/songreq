import React, { Component } from 'react';
import SearchResult from './SearchResult';

class SearchResultList extends Component {

  render() {
    return (
      <div className="search-result-list">
        {(this.props.results) ? this.renderResults() : this.renderNoResultsMessage() }
      </div>
    );
  }

  renderResults() {
    // TODO render other types, artists, albums, etc.
    return this.props.results.songs.map((song) => (
      <div key={song.uri} className="row">
        <div className="col-12">
          <SearchResult result={song} />
        </div>
      </div>
    ))
  }

  renderNoResultsMessage() {
    return (
      <div className="row">
        <div className="col-12 text-center pad-top">
          <em>No results found for "{this.props.query}"</em>
        </div>
      </div>
    );
  }
}

export default SearchResultList;
