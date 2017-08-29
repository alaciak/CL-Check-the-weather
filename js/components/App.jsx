import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import CurrentWeather from './CurrentWeather.jsx';
import '../../scss/style.scss';

class App extends React.Component {
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
      <Header onChangeLocation = { this.handleChangeLocation }/>
      <CurrentWeather query={ this.state.query } />
    </div>
  }
}

document.addEventListener('DOMContentLoaded', function(){


ReactDOM.render(
      <App />,
      document.querySelector('#app')
  );

});
