import React from 'react';
import Nav from './Nav.jsx';
import {Link, IndexLink} from 'react-router';

class MyLocation extends React.Component {

handleOnClick = event => {
  if(typeof this.props.onChangeLocation === 'function') {
    this.props.onChangeLocation(this.props.text);
  }
}

  render() {
    return <li><span onClick={ this.handleOnClick }>{ this.props.text }</span><span className='remove-location'>X</span>
    </li>
  }
}

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
    this.setState({myLocations: this.getMyLocations()});
  }

  render() {
    if (this.state.myLocations.length < 1) {
      return <div className='col-12'>
        <Nav/>
        <div className='no-locations-alert'>You have no locations added yet</div>
        <div className='col-3 link-main'>
          <Link className='link-main' to='/'>Back to the main page</Link>
        </div>
      </div>
    } else {
      let locations = this.state.myLocations.map((el, index) => {
        return <MyLocation key={ index } text={ el } onChangeLocation={ this.props.onChangeLocation }/>
      })
      return <div className='col-12'>
        <Nav/>
        <ul className='locations-list'>
          <p>My Locations</p>{locations}</ul>
        <div className='link-main'>
          <Link to='/'>&lt;&lt; back to the main page</Link>
        </div>
      </div>
    }
  }
}

module.exports = MyLocations;
