import React, { Component } from 'react';
import './Header.css';
import Header from './Header';

export default function asPage(PageComponent) {
  return class extends Component {
    render() {
      return (
        <div className="container body-container">
          <Header />
          <PageComponent {...this.props}/>
        </div>
      );
    }
  }
}
