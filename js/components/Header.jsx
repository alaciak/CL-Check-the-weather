import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav.jsx';
import SearchCity from './SearchCity.jsx';

class Header extends React.Component {

  render() {
    return <div className='container'>
      <div className='row'>
        <Nav />
        <SearchCity/>
        <div className='search-icon col-1'></div>
      </div>
    </div>
  }
}

module.exports = Header;
