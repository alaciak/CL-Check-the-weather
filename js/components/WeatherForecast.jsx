import React from 'react';
import ReactDOM from 'react-dom';


class WeatherForecastDay extends React.Component {

  render() {
    return <p className='weather-forecast_day'>{ this.props.dayName }</p>
  }
}

class WeatherForecastConditions extends React.Component {

  render() {
    return <p className='weather-forecast_temperature'>{this.props.tempMax}&#8451; {this.props.tempMin}&#8451;</p>
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
      loading: true
    }
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }

  sortBiggest(a, b) {
      return b - a;
    }
    sortLowest(a, b) {
      return a - b;
    }

  getWeather = query => {
    if(query != '') {
      // const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?mode=json&units=metric&APPID=68ff784ae84d9c0d9f1d3d2be50a07d7&q=';
      const baseUrl = 'http://localhost:3000/';
      fetch(baseUrl + query).then(resp => {
        const contentType = resp.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return resp.json();
        }
        throw new TypeError("Error");
      }).then(data => {
        let tempsMin1 = [];
        let tempsMax1  = [];
        let tempsMin2 = [];
        let tempsMax2  = [];
        let tempsMin3 = [];
        let tempsMax3  = [];
        console.log(tempsMin1);
        console.log(tempsMax1);

        for(let i  = 0; i < data.list.length-32; i++) {
          tempsMin1.push(parseInt(data.list[i].main.temp_min));
          tempsMax1.push(parseInt(data.list[i].main.temp_max));
        }
        tempsMax1.sort(this.sortBiggest());
        tempsMin1.sort(this.sortLowest());

        for(let i  = 8; i < data.list.length-24; i++) {
          tempsMin2.push(parseInt(data.list[i].main.temp_min));
          tempsMax2.push(parseInt(data.list[i].main.temp_max));
        }
        tempsMax2.sort(this.sortBiggest());
        tempsMin2.sort(this.sortLowest());

        for(let i  = 16; i < data.list.length - 14; i++) {
          tempsMin3.push(parseInt(data.list[i].main.temp_min));
          tempsMax3.push(parseInt(data.list[i].main.temp_max));
        }

        tempsMax3.sort(this.sortBiggest());
        tempsMin3.sort(this.sortLowest());


        this.setState({
          tempMin1: Math.ceil(tempsMin1[0]),
          tempMax1: Math.ceil(tempsMax1[0]),
          iconId1: data.list[0].weather[0].icon,
          dayName1: data.list[0].dt_txt.slice(0, 11),
          tempMin2: Math.ceil(tempsMin2[0]),
          tempMax2: Math.ceil(tempsMax2[0]),
          iconId2: data.list[8].weather[0].icon,
          dayName2: data.list[8].dt_txt.slice(0, 11),
          tempMin3: Math.ceil(tempsMin3[0]),
          tempMax3: Math.ceil(tempsMax3[0]),
          iconId3: data.list[18].weather[0].icon,
          dayName3: data.list[18].dt_txt.slice(0, 11),
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
            <WeatherForecastDay dayName={ this.state.dayName1 }/>
            <WeatherForecastIcons iconId={ this.state.iconId1 }/>
            <WeatherForecastConditions tempMin={ this.state.tempMin1 } tempMax={ this.state.tempMax1 } />
            </div>
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
          </div>
        </div>
      </section>
    }
  }
}

module.exports = WeatherForecast;