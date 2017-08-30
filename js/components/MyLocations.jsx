import React from 'react';
import Nav from './Nav.jsx';
import {Link, IndexLink} from 'react-router';

class MyLocations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myLocations: []
    }
  }

  getMyLocations() {
    return JSON.parse(localStorage.getItem('locations')) || [];
  }

  componentDidMount() {
    this.setState({
      myLocations: this.getMyLocations()
    });
  }

  render() {
    if (this.state.myLocations.length < 1) {
      return <div>
        <div>You have no locations added yet</div>
        <div>
          <Link to='/'>Back to the main page</Link>
        </div>
      </div>
    } else {
      let locations = this.state.myLocations.map((el, index) => {
        return <li key={index}>{el}</li>
      })
      return <div>
        <Nav/>
        <ul>{locations}</ul>
        <div>
          <Link to='/'>Back to the main page</Link>
        </div>
      </div>
    }
  }
}

module.exports = MyLocations;
