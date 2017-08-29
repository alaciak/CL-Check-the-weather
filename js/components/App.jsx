import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import "../../scss/style.scss";

document.addEventListener('DOMContentLoaded', function(){


ReactDOM.render(
      <Header />,
      document.querySelector('header')
  );

});
