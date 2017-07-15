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

var ArtistInstance = require('./Artist-Instance');
var AlbumInstance = require('./Album-Instance');
var TourInstance = require('./Tour-Instance');
var SongInstance = require('./Song-Instance');

var SearchResults = require('./SearchResults.js');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
        	<Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/artists' component={Artists} />
            <Route path='/artists/:artistID' component={ArtistInstance} />
            <Route exact path='/albums' component={Albums} />
            <Route path='/albums/:albumID' component={AlbumInstance} />
            <Route exact path='/tours' component={Tours} />
            <Route path='/tours/:tourID' component={TourInstance} />
            <Route exact path='/songs' component={Songs} />
            <Route path='/songs/:songID' component={SongInstance} />
            <Route path='/about' component={About} />
            <Route path='/search/:searchString' component={SearchResults} />
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
