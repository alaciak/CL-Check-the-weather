import React from 'react';
import SearchBox from './SearchBox.jsx';
import WeatherCurrent from './WeatherCurrent.jsx';
import WeatherForecast from './WeatherForecast.jsx';
import ManageMyLocations from './ManageMyLocations.jsx';

class WeatherPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        query: (this.props.params.city) ? this.props.params.city : 'Krakow'
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
      <SearchBox onChangeLocation={ this.handleChangeLocation }/>
      <WeatherCurrent query={ query } />
      <ManageMyLocations location={ query }/>
      <WeatherForecast query={ query } />
    </div>;
  }
}

 module.exports = WeatherPage;
