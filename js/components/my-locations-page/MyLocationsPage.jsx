import React from 'react';
import AlertContainer from 'react-alert';
import {
  Link,
  IndexLink
} from 'react-router';

class MyLocation extends React.Component {

  handleOnClickRemoveLocation = event => {
    if (typeof this.props.onRemoveLocation === 'function') {
      this.props.onRemoveLocation(this.props.text);
    }
  }

  render() {
    return <li className='my-locations_check'>
      <Link to={ this.props.text }>{ this.props.text }</Link>
      <span className='location-remove' onClick={ this.handleOnClickRemoveLocation }>X</span>
    </li>;
  }
}

class MyLocationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myLocations: []
    }
      this.alertOptions = {
        offset: 14,
        position: 'bottom left',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
      };
    }

  getMyLocations() {
    return JSON.parse(localStorage.getItem('locations')) || [];
  }

  componentDidMount() {
    this.setState({
      myLocations: this.getMyLocations()
    });
  }

  onRemoveLocation = event => {
    let locations = JSON.parse(localStorage.getItem('locations'));
    locations.splice(locations.indexOf(event), 1);
    localStorage.setItem('locations', JSON.stringify(locations));
    this.setState({
      myLocations: locations
    });
    this.msg.show('Your location has been successfully removed', {
      time: 2000,
      type: 'success',
      icon: <img src='images/alert-icon.png' />
    });
  }

  render() {
    if (this.state.myLocations.length < 1) {
      return <div className='col-12'>
        <div className='no-locations-message'>
          <div>You have no locations added yet...</div>
          <Link className='link-main_page' to='/'>&lt;&lt; back to the main page</Link>
        </div>
        <alert className='col-4 alert-message'>
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        </alert>
      </div>
    } else {
      let locations = this.state.myLocations.map((el, index) => {
        return <MyLocation key={ index } text={ el } onRemoveLocation={ this.onRemoveLocation }/>
      });
      return <div>
        <div className='locations-list'>
          <ul>
            <p>My Locations</p>{locations}
          </ul>
          <div className='link-main_page'>
            <Link to='/'>&lt;&lt; back to the main page</Link>
          </div>
        </div>
        <alert className='col-4 alert-message'>
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        </alert>
      </div>
    }
  }
}

module.exports = MyLocationsPage;
