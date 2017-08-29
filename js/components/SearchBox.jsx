import React from 'react';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Search by city name...'
    }
  }

handleOnClickSearch = event => {
  event.preventDefault();
    this.setState({
      text: ''
    });
}
handleOnBlur = event => {
  this.setState({
    text: 'Search by city name...'
  })
}
  handleOnChangeSearch = event => {
    event.preventDefault();
    this.setState({
      text: event.target.value
    });
  }

  render() {
    return <input className='col-10' type='text' value={ this.state.text } onChange={ this.handleOnChangeSearch } onClick={ this.handleOnClickSearch } onBlur={ this.handleOnBlur }></input>;
  }
}

module.exports = SearchBox;
