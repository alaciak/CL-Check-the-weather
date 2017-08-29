import React from 'react';
import ReactDOM from 'react-dom';

class City extends React.Component {

  render() {
    return <div className='col-4 weather-current_city'>{ this.props.name }</div>
  }
}
class WeatherConditions extends React.Component {

  render() {
    return <div className='col-4'>
      <p className='weather-current_temperature'>{ this.props.temperature } &#8451; </p>
      <p className='weather-current_description'>{ this.props.description }</p>
    </div>
  }
}

class WeatherIcon extends React.Component {

  render() {
    return <div className='col-4 weather-current_icon'><img src={'https://openweathermap.org/img/w/'+ this.props.iconId +'.png'}></img></div>
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
    fetch('http://localhost:3000/' + this.state.query).then(resp => resp.json()).then(data => {
      console.log(data.weather[0].icon);
      this.setState({
        city: data.name,
        temperature: Math.ceil(data.main.temp),
        description: data.weather[0].description,
        iconId: data.weather[0].icon,
        loading: false});
    });
  }

  render() {
    if (this.state.loading) {
      return null
    } else {
      return <div className='container'>
        <div className='row weather-current'>
          <City name={this.state.city}/>
          <WeatherConditions temperature={this.state.temperature} description={this.state.description}/>
          <WeatherIcon iconId={this.state.iconId}/>
        </div>
      </div>
    }
  }
}

module.exports = CurrentWeather;
