var React = require('react');
var api = require('../api');

class Artist_Instance extends React.Component {

  constructor(props) {
    super();
    this.state = {
      artist: null
    };
  }

  componentDidMount() {
    this.updateAlbum(this.state.artist);
  }

  updateAlbum(a){
    var artistID = this.props.match.params.artistID;

    this.setState(function() {
      return {
        artist: a
      }
    });

    api.getAlbum(artistID)
      .then(function(a) {
        console.log(a)
        this.setState(function () {
          return {
            artist: a
          }
        });
      }.bind(this));
  }

  render() {
    console.log(JSON.stringify(this.state.artist))
    console.log(this.state.artist)
    const { artist } = this.state;
    if(!artist) {
      return <p>LOADING!</p>
    }
    else {
      return (
        <div className="container">

          <h1>hey</h1>
          <h1>{artist.Name}</h1>

        </div>
      )

    }
  }
}

module.exports = Artist_Instance;
