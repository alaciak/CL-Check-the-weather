import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './SearchBox.jsx';

class Header extends React.Component {

  render() {
    return <header>
      <div className='container'>
        <div className='row'>
          <SearchBox onChangeLocation={ this.props.onChangeLocation }/>
        </div>
      </div>
    </header>

  }
}

module.exports = Header;
