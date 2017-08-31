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
      <p className='weather-current_temperature'>{ this.props.temperature }
        &#8451;
      </p>
      <p className='weather-current_description'>{ this.props.description }</p>
    </div>
  }
}

class WeatherIcon extends React.Component {

  render() {
    return <div className='col-4 weather-current_icon'>
      <img src={'https://openweathermap.org/img/w/' + this.props.iconId + '.png'}></img>
    </div>
  }
}

class WeatherCurrent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  isEmpty(string) {
        return (!string || 0 === string.length);
    }

  getWeather = query => {
    if(!this.isEmpty(query)) {
      const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&APPID=68ff784ae84d9c0d9f1d3d2be50a07d7&q=';
      fetch(baseUrl + query).then(resp => {
        const contentType = resp.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return resp.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
      }).then(data => {
        this.setState({
          city: data.name,
          temperature: Math.ceil(data.main.temp),
          description: data.weather[0].description,
          iconId: data.weather[0].icon,
          loading: false
        });
      })
      .catch(function(error) {
        console.log(error); });
    }
  }

  componentDidMount() {
    this.getWeather(this.props.query);
  }

  componentWillReceiveProps(nextProps) {
    this.getWeather(nextProps.query);
  }

  render() {
    if (this.state.loading) {
      return null
    } else {
      return <section id='weather-current'>
        <div className='container'>
          <div className='row weather-current'>
            <p className='weather-current_heading'>Current Weather</p>
            <City name={ this.state.city }/>
            <WeatherConditions temperature={ this.state.temperature } description={ this.state.description }/>
            <WeatherIcon iconId={ this.state.iconId }/>
          </div>
        </div>
      </section>
    }
  }
}

module.exports = WeatherCurrent;
