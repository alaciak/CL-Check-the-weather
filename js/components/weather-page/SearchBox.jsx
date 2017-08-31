import React from 'react';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Check the weather by city name...'
    }
  }

  handleOnClickSearch = event => {
    event.preventDefault();
    this.setState({
      text: ''
    });
  }

  handleOnChangeSearch = event => {
    event.preventDefault();
    this.setState({
      text: event.target.value
    });
  }

  handleOnClick = event => {
    if(this.state.text !== 'Check the weather by city name...' && typeof this.props.onChangeLocation === 'function') {
      this.props.onChangeLocation(this.state.text);
    }
  }

  handleOnKeyPress = event => {
    if(event.key === 'Enter') {
      this.handleOnClick(event.target.value);
      }
    }

  render() {
    return  <div className='container search-box'>
        <div className='row'>
          <input className='col-10' type='text' value={ this.state.text } onChange={ this.handleOnChangeSearch } onClick={ this.handleOnClickSearch } onKeyPress={ this.handleOnKeyPress } ></input>
          <div className='search-icon col-1' onClick={ this.handleOnClick } ></div>
        </div>
      </div>;
  }
}

module.exports = SearchBox;
