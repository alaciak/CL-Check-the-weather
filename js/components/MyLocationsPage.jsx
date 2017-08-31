import React from 'react';
import Nav from './Nav.jsx';
import {Link, IndexLink} from 'react-router';

class MyLocation extends React.Component {

  handleOnCLickRemoveLocation = event => {
    if (typeof this.props.onRemoveLocation === 'function') {
      this.props.onRemoveLocation(this.props.text);
    }
  }

  render() {
    return <li className='my-locations_check'>
      <Link to={this.props.text}>{ this.props.text }</Link>
      <span className='location-remove' onClick={ this.handleOnCLickRemoveLocation }>X</span>
    </li>
  }
}

class MyLocationsPage extends React.Component {
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
    this.setState({myLocations: this.getMyLocations()});
  }

  onRemoveLocation = event => {
    let locations = JSON.parse(localStorage.getItem('locations'));
    locations.splice(locations.indexOf(this.props.text), 1);
    localStorage.setItem('locations', JSON.stringify(locations));
    this.setState({myLocations: locations})
  }

  render() {
    if (this.state.myLocations.length < 1) {
      return <div className='col-12'>
        <Nav/>
        <div className='no-locations-message'>
          <div>You have no locations added yet...</div>
          <Link className='link-main_page' to='/'>&lt;&lt; back to the main page</Link>
        </div>
      </div>
    } else {
      let locations = this.state.myLocations.map((el, index) => {
        return <MyLocation key={ index } text={ el } onRemoveLocation={ this.onRemoveLocation }/>
      })
      return <div>
        <Nav/>
        <div className='locations-list'>
          <ul>
            <p>My Locations</p>{locations}</ul>
          <div className='link-main_page'>
            <Link to='/'>&lt;&lt; back to the main page</Link>
          </div>
        </div>
      </div>
    }
  }
}

module.exports = MyLocationsPage;
