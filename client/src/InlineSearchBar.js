import React, { Component } from 'react';
import './InlineSearchBar.css';

class InlineSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('Search Bar Input: ' + this.state.value);
    event.preventDefault();

    this.props.onSubmit(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" placeholder={this.props.placeholder} />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-search-inline">
                  {this.props.children}
                </button>
              </span>
          </div>
        </div>
      </form>
    );
  }
}

export default InlineSearchBar;
