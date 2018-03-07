import React, { Component } from 'react';
import logo from './images/logo.svg';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-12 text-center page-intro">
          <img src={logo} width="200" height="79" className="logo" alt="Songreq" />
        </div>
      </div>
    );
  }
}

export default Header;
