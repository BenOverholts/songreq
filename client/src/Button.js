import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    console.log(`Button "${this.props.content}" was clicked.`);
    // TODO redirect
  }

  render() {
    return (
      <button className={`btn ${this.props.kind} ${this.props.className}`} onClick={this.handleClick}>
        {this.props.content}
      </button>
    );
  }
}

export default Button;
