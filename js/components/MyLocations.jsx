import React from 'react';
import Nav from './Nav.jsx';
import {
  Link,
  IndexLink,
} from 'react-router';

class MyLocations extends React.Component {
  render() {
    return <div>
      <Nav />
      <div><Link to='/'>Back to the main page</Link></div>
    </div>
  }
}

module.exports = MyLocations;
