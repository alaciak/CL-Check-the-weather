import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './SearchBox.jsx';
import Nav from './Nav.jsx';

class Header extends React.Component {

  render() {
    return <header>
      <Nav />
      <div className='container search-box'>
        <div className='row'>
          <SearchBox onChangeLocation={ this.props.onChangeLocation }/>
        </div>
      </div>
    </header>

  }
}

module.exports = Header;
