import React from 'react';

class WeatherForecastDay extends React.Component {

  render() {
    return <p className='weather-forecast_day'>{ this.props.dayName }</p>
  }
}

class WeatherForecastConditions extends React.Component {

  render() {
    return <p className='weather-forecast_temperature'><span className='weather-forecast_temperature_max'>{ this.props.tempMax }&#8451;</span><span>{ this.props.tempMin }&#8451;</span></p>
  }
}

class WeatherForecastIcons extends React.Component {

  render() {
    return <span className='weather-forecast_icon'>
      <img src={'https://openweathermap.org/img/w/' + this.props.iconId + '.png'}></img>
    </span>
  }
}

class WeatherDaily extends React.Component {

  render() {
    let tempsMin = [];
    let tempsMax  = [];
    for(let i  = 0; i < this.props.weatherDaily.length; i++) {
      tempsMin.push(parseInt(this.props.weatherDaily[i].main.temp_min));
      tempsMax.push(parseInt(this.props.weatherDaily[i].main.temp_max));
    }
    tempsMax.sort((a, b) => b - a);
    tempsMin.sort((a, b) => a - b);
    let tempMin = Math.ceil(tempsMin[0]);
    let tempMax = Math.ceil(tempsMax[0]);
    let iconId = this.props.weatherDaily[4].weather[0].icon.replace('n', 'd');
    let dayName = this.props.dayNames[new Date(this.props.weatherDaily[0].dt_txt).getDay()];

    return <div className='col-4'>
        <WeatherForecastDay dayName={ dayName } />
        <WeatherForecastIcons iconId={ iconId } />
        <WeatherForecastConditions tempMin={ tempMin } tempMax={ tempMax } />
      </div>
  }
}

class WeatherForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  }

  getWeather = query => {
    if(query != '') {
      const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?mode=json&units=metric&APPID=68ff784ae84d9c0d9f1d3d2be50a07d7&q=';
      fetch(baseUrl + query).then(resp => {
        const contentType = resp.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return resp.json();
        }
        throw new TypeError("Error");
      }).then(data => {
        let day1= [];
        let day2 = [];
        let day3 = [];
        let day4 = [];
        let currentDay = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
        let nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 3);


        for(let i = 0; i < data.list.length; i++) {
          if(String(currentDay).slice(4, 16) === String(new Date(data.list[i].dt_txt)).slice(4, 16)) {
            day1.push(data.list[i]);
          }
          if(String(tomorrow).slice(4, 16) === String(new Date(data.list[i].dt_txt)).slice(4, 16)) {
            day2.push(data.list[i]);
          }
          if(String(dayAfterTomorrow).slice(4, 16) === String(new Date(data.list[i].dt_txt)).slice(4, 16)) {
            day3.push(data.list[i]);
          }
          if(String(nextDay).slice(4, 16) === String(new Date(data.list[i].dt_txt)).slice(4, 16)) {
            day4.push(data.list[i]);
          }
        }

        this.setState({
          day2: day2,
          day3: day3,
          day4: day4,
          loading: false
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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
      return <section id='weather-forecast'>
        <div className='container'>
          <div className='row weather-forecast'>
            <p className='forecast-heading'>3 day weather forecast</p>
            <WeatherDaily weatherDaily={ this.state.day2 } dayNames={ this.state.dayNames } />
            <WeatherDaily weatherDaily={ this.state.day3 } dayNames={ this.state.dayNames } />
            <WeatherDaily weatherDaily={ this.state.day4 } dayNames={ this.state.dayNames } />
          </div>
        </div>
      </section>
    }
  }
}

module.exports = WeatherForecast;
