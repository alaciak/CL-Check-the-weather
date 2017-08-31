import React from 'react';
import ReactDOM from 'react-dom';
import AlertContainer from 'react-alert';
import {
  Link,
  IndexLink,
} from 'react-router';

class ManageMyLocations extends React.Component {
  constructor(props){
    super(props);
    this.alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
  }

handleAddLocation = event => {
  event.preventDefault();
  if(this.props.location.length > 0) {
    let myLocations = JSON.parse(localStorage.getItem('locations')) || [];
    if(myLocations.indexOf(this.props.location) === -1) {
      let newLocations = [this.props.location,...myLocations];
      localStorage.setItem('locations', JSON.stringify(newLocations));
    }
  }
  this.msg.show('Your location has been added', {
    time: 2000,
    type: 'success',
    icon: <img src='images/alert-icon.png' />
  });
}

  render() {
    return <section id='add-locations'>
      <div className='container'>
        <div className='row my-locations'>
          <div className='col-6' onClick={ this.handleAddLocation } ><a href='#'>Add to my locations</a></div>
          <div className='col-6 my-locations_button-check'><Link to='/locations'>My locations</Link></div>
        </div>
      </div>
      <alert className='col-4 alert-message'>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
      </alert>
  </section>
  }
}

module.exports = ManageMyLocations;
