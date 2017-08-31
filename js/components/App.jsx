import React from 'react';
import ReactDOM from 'react-dom';
import WeatherPage from './WeatherPage.jsx'
import MyLocationsPage from './MyLocationsPage.jsx'
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
      <Route path="/">
        <IndexRoute component={ WeatherPage }/>
        <Route path="/locations" component={ MyLocationsPage }/>
      </Route>
      <Route path="/:city" component={ WeatherPage }/>
    </Router>
  }
}

document.addEventListener('DOMContentLoaded', function() {

  ReactDOM.render(
    <App/>, document.querySelector('#app'));
});
