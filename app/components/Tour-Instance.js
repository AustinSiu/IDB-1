var React = require('react');
var api = require('../api');

class Tour_Instance extends React.Component {

  constructor(props) {
    super();
    this.state = {
      tour: null
    };
  }

  componentDidMount() {
    this.updateAlbum(this.state.tour);
  }

  updateAlbum(a){
    var tourID = this.props.match.params.tourID;

    this.setState(function() {
      return {
        tour: a
      }
    });

    api.getAlbum(tourID)
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
    console.log(JSON.stringify(this.state.tour))
    console.log(this.state.tour)
    const { tour } = this.state;
    if(!tour) {
      return <p>LOADING!</p>
    }
    else {
      return (
        <div className="container">

          <h1>hey</h1>
          <h1>{tour.Name}</h1>

        </div>
      )

    }
  }
}

module.exports = Tour_Instance;
