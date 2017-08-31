import React from 'react';

class WeatherForecastDay extends React.Component {

  render() {
    return <p className='weather-forecast_day'>{ this.props.dayName }</p>
  }
}

class WeatherForecastConditions extends React.Component {

  render() {
    return <p className='weather-forecast_temperature'>{ this.props.tempMax }&#8451; { this.props.tempMin }&#8451;</p>
  }
}

class WeatherForecastIcons extends React.Component {

  render() {
    return <span className='weather-forecast_icon'>
      <img src={'https://openweathermap.org/img/w/' + this.props.iconId + '.png'}></img>
    </span>
  }
}

class WeatherForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayOfWeek: '',
      loading: true,
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  }


  getWeather = query => {
    if(query != '') {
      const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?mode=json&units=metric&APPID=68ff784ae84d9c0d9f1d3d2be50a07d7&q=';
      fetch(baseUrl + query).then(resp => {
        const contentType = resp.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return resp.json();
        }
        throw new TypeError("Error");
      }).then(data => {
        let day1 = [];
        let day2 = [];
        let day3= [];
        let day4=[];
        let tempsMin2 = [];
        let tempsMax2  = [];
        let tempsMin3 = [];
        let tempsMax3  = [];
        let tempsMin4 = [];
        let tempsMax4  = [];
        let currentDay = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
        let nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 3);


        for(let i = 0; i < data.list.length; i++) {
          if(String(currentDay).slice(4, 16) === String(new Date(data.list[i].dt_txt)).slice(4, 16)) {
            day1.push(data.list[i].dt_txt);
          }
          if(String(tomorrow).slice(4, 16) === String(new Date(data.list[i].dt_txt)).slice(4, 16)) {
            day2.push(data.list[i].dt_txt);
          }
          if(String(dayAfterTomorrow).slice(4, 16) === String(new Date(data.list[i].dt_txt)).slice(4, 16)) {
            day3.push(data.list[i].dt_txt);
          }
          if(String(nextDay).slice(4, 16) === String(new Date(data.list[i].dt_txt)).slice(4, 16)) {
            day4.push(data.list[i].dt_txt);
          }
        }

        for(let i  = (day1.length - 1); i < (day1.length + day2.length); i++) {
          tempsMin2.push(parseInt(data.list[i].main.temp_min));
          tempsMax2.push(parseInt(data.list[i].main.temp_max));
        }
        tempsMax2.sort((a, b) => b - a);
        tempsMin2.sort((a, b) => a - b);

        for(let i  = (day1.length + day2.length - 2); i < (day1.length + day2.length + day3.length); i++) {
          tempsMin3.push(parseInt(data.list[i].main.temp_min));
          tempsMax3.push(parseInt(data.list[i].main.temp_max));
        }

       tempsMax3.sort((a, b) => b - a);
       tempsMin3.sort((a, b) => a - b);

        for(let i  = (day1.length + day2.length + day3.length - 2); i < (day1.length + day2.length + day3.length + day4.length); i++) {
          tempsMin4.push(parseInt(data.list[i].main.temp_min));
          tempsMax4.push(parseInt(data.list[i].main.temp_max));
        }

       tempsMax4.sort((a, b) => b - a);
       tempsMin4.sort((a, b) => a - b);

        this.setState({
          tempMin2: Math.ceil(tempsMin2[0]),
          tempMax2: Math.ceil(tempsMax2[0]),
          iconId2: data.list[(day1.length+ 4)].weather[0].icon,
          dayName2: this.state.days[new Date(data.list[(day1.length + 4)].dt_txt).getDay()],
          tempMin3: Math.ceil(tempsMin3[0]),
          tempMax3: Math.ceil(tempsMax3[0]),
          iconId3: data.list[(day1.length + 12)].weather[0].icon,
          dayName3: this.state.days[new Date(data.list[(day1.length + 12)].dt_txt).getDay()],
          tempMin4: Math.ceil(tempsMin4[0]),
          tempMax4: Math.ceil(tempsMax4[0]),
          iconId4: data.list[(day1.length + 20)].weather[0].icon,
          dayName4: this.state.days[new Date(data.list[(day1.length + 20)].dt_txt).getDay()],
          loading: false
        });
      })
      .catch(function(error) { console.log(error); });

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
            <div className='col-4'>
              <WeatherForecastDay dayName={ this.state.dayName2 }/>
              <WeatherForecastIcons iconId={ this.state.iconId2 }/>
              <WeatherForecastConditions tempMin={ this.state.tempMin2 } tempMax={ this.state.tempMax2 } />
            </div>
            <div className='col-4'>
              <WeatherForecastDay dayName={ this.state.dayName3 }/>
              <WeatherForecastIcons iconId={ this.state.iconId3 }/>
              <WeatherForecastConditions tempMin={ this.state.tempMin3 } tempMax={ this.state.tempMax3 } />
            </div>
            <div className='col-4'>
              <WeatherForecastDay dayName={ this.state.dayName4 }/>
              <WeatherForecastIcons iconId={ this.state.iconId4 }/>
              <WeatherForecastConditions tempMin={ this.state.tempMin4 } tempMax={ this.state.tempMax4 } />
            </div>
          </div>
        </div>
      </section>
    }
  }
}

module.exports = WeatherForecast;
