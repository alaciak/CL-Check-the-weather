import React from 'react';
import ReactDOM from 'react-dom';

class City extends React.Component {

  render() {
    return <div>{ this.props.name }</div>
  }
}
class WeatherConditions extends React.Component {

  render() {
    return <div>
      <p>{ this.props.temperature }</p>
      <p>{ this.props.description }</p>
    </div>
  }
}

class WeatherIcon extends React.Component {

  render() {
    return <div style={{ backgroundImage: `url(https://openweathermap.org/img/w/${this.props.iconId}.png)`, height: '100px' }}></div>
  }
}

class CurrentWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.query,
      loading: true
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/' + this.state.query)
    .then(resp => resp.json())
    .then(data => {
      console.log(data.weather[0].icon);
      this.setState({
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        iconId: data.weather[0].icon,
        loading: false
      });
    });
  }

  render() {
    if(this.state.loading) {
      return null
    } else {      
      return <div className='container'>
        <div className='row'>
          <City name={ this.state.city }/>
          <WeatherConditions temperature={ this.state.temperature } description={ this.state.description }/>
          <WeatherIcon iconId={ this.state.iconId }/>
        </div>
      </div>
    }
  }
}

module.exports = CurrentWeather;
