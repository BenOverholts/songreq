import React, { Component } from 'react';
import Button from './Button';

const REQUESTS = [
  {
    id: "1",
    partyId: "12345",
    song: {
      uri: "0987654321",
      name: "Sansa",
      artist: "Gareth Emery",
      artUrl: "foobar"
    },
    requester: "Kristen Skillman"
  },
  {
    id: "1",
    partyId: "12345",
    song: {
      uri: "0987654321",
      name: "Long Way Home",
      artist: "Gareth Emery",
      artUrl: "foobar"
    },
    requester: "Ben Overholts"
  }
]

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: REQUESTS
    }
  }

  render() {
    console.log(this.state.requests);
    return (
      <div className="list">
        {this.state.requests.map((request) => (
          <div key={request.id} className="row">
            <div className="col-12 song-request">
              <div className="song-request-details float-left">
                <span className="song-name">{request.song.name}</span>
                <span className="song-artist"> - {request.song.artist}</span>
              </div>
              <div className="song-request-buttons float-right">
                <Button kind="secondary">NO</Button>
                <Button kind="primary">YES</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default List;
