import React from 'react';
import ReactDOM from 'react-dom';
import HamburgerMenu from './HamburgerMenu.jsx';

class Nav extends React.Component {
  render() {
    return <nav>
          <HamburgerMenu />
        </nav>
  }
}

module.exports = Nav;
