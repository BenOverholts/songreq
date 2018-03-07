import React, { Component } from 'react';
import Welcome from './Welcome';
import logo from './images/logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container body-container">
        <div className="row">
          <div className="col-12 text-center page-intro">
            <img src={logo} width="200" height="79" className="App-logo" alt="Songreq" />
          </div>
        </div>

        <div className="App">
          {/* TODO Wrap with a routing component. */}
          <Welcome />
        </div>
      </div>
    );
  }
}

export default App;
