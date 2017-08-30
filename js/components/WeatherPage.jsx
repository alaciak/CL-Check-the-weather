import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import CurrentWeather from './CurrentWeather.jsx';
import WeatherForecast from './WeatherForecast.jsx';
import ManageMyLocations from './ManageMyLocations.jsx';
import MyLocations from './MyLocations.jsx';
import '../../scss/style.scss';


class WeatherPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        query: ''
      }
    }

  handleChangeLocation = text => {
    this.setState({
      query: text
    });
  }

  render() {
    return <div>
      <Header onChangeLocation={ this.handleChangeLocation }/>
      <CurrentWeather query={ this.state.query } />
      <ManageMyLocations />
      <WeatherForecast query={ this.state.query } />
    </div>
  }
}

 module.exports = WeatherPage;
