import React from 'react';
import ReactDOM from 'react-dom';
import WeatherPage from './weather-page/WeatherPage.jsx';
import MyLocationsPage from './my-locations-page/MyLocationsPage.jsx';
import Main from './Main.jsx';
import '../../scss/style.scss';
import {
  Router,
  Route,
  Link,
  IndexLink,
  IndexRoute,
  hashHistory
} from 'react-router';

class App extends React.Component {

  render() {
    return <Router history={ hashHistory }>
      <Route path="/" component={ Main }>
        <IndexRoute component={ WeatherPage }/>
        <Route path="/locations" component={ MyLocationsPage }/>
        <Route path="/:city" component={ WeatherPage }/>
      </Route>
    </Router>;
  }
}

document.addEventListener('DOMContentLoaded', function() {

  ReactDOM.render(
    <App/>, document.querySelector('#app'));
});
