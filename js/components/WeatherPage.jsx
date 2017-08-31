import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import WeatherCurrent from './WeatherCurrent.jsx';
import WeatherForecast from './WeatherForecast.jsx';
import ManageMyLocations from './ManageMyLocations.jsx';
import '../../scss/style.scss';


class WeatherPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        query: null
      }
    }

    componentDidMount() {
      if (this.props.params.city === undefined) {
        this.setState({
          query: 'Krakow'
        });
      }
    }

  handleChangeLocation = text => {
    this.setState({
      query: text
    });
  }

  render() {
    let query = (this.state.query) ? this.state.query : this.props.params.city;
    return <div>
      <Header onChangeLocation={ this.handleChangeLocation }/>
      <WeatherCurrent query={ query } />
      <ManageMyLocations location={ query }/>
      <WeatherForecast query={ query } />
    </div>
  }
}

 module.exports = WeatherPage;
