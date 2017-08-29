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


  handleOnChangeSearch = event => {
    event.preventDefault();
    this.setState({
      text: event.target.value
    });
  }

  handleOnClick = event => {
    if(this.state.text !== 'Search by city name...' && typeof this.props.onChangeLocation === 'function') {
      this.props.onChangeLocation(this.state.text);
    }
  }

  render() {
    return <div>
      <input className='col-10' type='text' value={ this.state.text } onChange={ this.handleOnChangeSearch } onClick={ this.handleOnClickSearch } ></input>
      <div className='search-icon col-1' onClick={ this.handleOnClick }></div>
    </div>;
  }
}

module.exports = SearchBox;
