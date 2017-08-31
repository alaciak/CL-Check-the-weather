import React from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  IndexLink,
} from 'react-router';

class ManageMyLocations extends React.Component {


handleAddLocation = event => {
  event.preventDefault();
  if(this.props.location.length > 0) {
    let myLocations = JSON.parse(localStorage.getItem('locations')) || [];
    if(myLocations.indexOf(this.props.location) === -1) {
      let newLocations = [this.props.location,...myLocations];
      localStorage.setItem('locations', JSON.stringify(newLocations));
    }
  }
}

  render() {
    return <section id='add-locations'>
      <div className='container'>
        <div className='row my-locations'>
          <div className='col-6' onClick={ this.handleAddLocation }><a href='#'>Add to my locations</a></div>
          <div className='col-6 my-locations_button-check'><Link to='/locations'>My locations</Link></div>
        </div>
      </div>
    </section>
  }
}

module.exports = ManageMyLocations;
