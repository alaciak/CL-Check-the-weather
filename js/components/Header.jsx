import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './SearchBox.jsx';

class Header extends React.Component {

  render() {
    return <div className='container'>
      <div className='row'>
        <SearchBox/>
        <div className='search-icon col-1'></div>
      </div>
    </div>
  }
}

module.exports = Header;
