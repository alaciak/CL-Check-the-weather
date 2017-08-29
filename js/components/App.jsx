import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import CurrentWeather from './CurrentWeather.jsx';
// import "../../scss/style.scss";

document.addEventListener('DOMContentLoaded', function(){

ReactDOM.render(
      <Header />,
      document.querySelector('header')
  );
ReactDOM.render(
      <CurrentWeather query='London' />,
      document.querySelector('#weather-current')
  );

});
