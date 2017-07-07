var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Navbar = require('./Navbar');

var Artists = require('./Artists');
var Albums = require('./Albums');
var Tours = require('./Tours');
var Songs = require('./Songs');


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
        	<Artists />
          <Route path='/artists' component={Artists} />
        </div>
      </Router>
    )
  }
}

module.exports = App;