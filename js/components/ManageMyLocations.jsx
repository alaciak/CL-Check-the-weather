import React from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  IndexLink,
} from 'react-router';



class ManageMyLocations extends React.Component {

handleAddLocation = event => {
  if(typeof this.props.onAddLocation === 'function') {
    this.props.onAddLocation(event.target.value);
  }
}

  render() {
    return <section id='add-locations'>
      <div className='container'>
        <div className='row my-locations'>
          <div className='col-6' onClick={ this.handleAddLocation }>Add to my locations</div>
          <div className='col-6'><Link to='/locations'>My locations</Link></div>
        </div>
      </div>
    </section>
  }
}

module.exports = ManageMyLocations;
