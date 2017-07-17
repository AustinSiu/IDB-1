var React = require('react');
var api = require('../api');
var Link = require('react-router-dom').Link;

class Tour_Instance extends React.Component {

  constructor(props) {
    super();
    this.state = {
      tour: null
    };
  }

  componentDidMount() {
    this.updateTour(this.state.tour);
  }

  updateTour(a){
    var tourID = this.props.match.params.tourID;

    this.setState(function() {
      return {
        tour: a
      }
    });

    api.getTour(tourID)
      .then(function(a) {
        console.log(a)
        this.setState(function () {
          return {
            tour: a
          }
        });
      }.bind(this));
  }

  render() {
    console.log(this.state.tour)
    const { tour } = this.state;
    if(!tour) {
      return <p>LOADING!</p>
    }
    else {
      return (
        <div className="container">
          <Link to={'/edit/tour/' + tour.TourID}><button>Edit</button></Link>
          <h1>Tour: {tour.Name}</h1>
          <img
            className='img'
            src={tour.Image}
            alt={'Image for ' + tour.Name}/>
          <ul>
            <li>Line Up: {tour.TourLineUp[0].Name}</li>
            <li>Locations: {tour.Locations}</li>
            <li>Venues: {tour.Venue}</li>
            <li>Tour Dates: {tour.tDate} </li>
            <li>
              <h3>Artist: </h3>
              {!tour.artist.ArtistID
                ? <div>{album.artist.Name}</div>
                : <div>
                  <Link to={'/artists/' + tour.artist.ArtistID}>
                    <img
                      className='img'
                      src={tour.artist.Image}
                      alt={'Image for ' + tour.artist.Name}/>
                    <br/>
                    {tour.artist.Name}
                  </Link>
                  </div>}
            </li>
          </ul>
        </div>
      )

    }
  }
}

module.exports = Tour_Instance;
