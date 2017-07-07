var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Navbar = require('./Navbar');

var Home = require('./Home');
var Artists = require('./Artists');
var Albums = require('./Albums');
var Tours = require('./Tours');
var Songs = require('./Songs');
var About = require('./About');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
        	<Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/artists' component={Artists} />
            <Route path='/albums' component={Albums} />
            <Route path='/tours' component={Tours} />
            <Route path='/songs' component={Songs} />
            <Route path='/about' component={About} />
            <Route render={function () {
              return <center>
                <h1>404</h1>
                <h2>Oops! We can't seem to find the page you're looking for.</h2>
                </center>
              }} />
          </Switch>  
        </div>
      </Router>
    )
  }
}

module.exports = App;