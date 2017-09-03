import React from 'react';

class WeatherGeolocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 0
    }
  }

 getLocation = event => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
        console.log( "Geolocation is not supported by this browser.");
    }
}

showPosition = position => {
  console.log(position.coords.latitude);
  this.setState({
    query:  position.coords.latitude,
    longitude: position.coords.longitude
  });
}



render() {
  return <div>
    <div>Your position is: { this.state.latitude }{ this.state.longitude }</div>
    <div className='weather-geolocation' onClick={ this.getLocation }>Check the weather for your current location</div>
  </div>
}


}

module.exports = WeatherGeolocation;
