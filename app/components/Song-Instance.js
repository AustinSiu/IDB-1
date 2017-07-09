var React = require('react');
var api = require('../api');

class Song_Instance extends React.Component {

  constructor(props) {
    super();
    this.state = {
      song: null
    };
  }

  componentDidMount() {
    this.updateSong(this.state.song);
  }

  updateSong(a){
    var songID = this.props.match.params.songID;

    this.setState(function() {
      return {
        song: a
      }
    });

    api.getSong(songID)
      .then(function(a) {
        console.log(a)
        this.setState(function () {
          return {
            song: a
          }
        });
      }.bind(this));
  }

  render() {
    console.log(JSON.stringify(this.state.song))
    console.log(this.state.song)
    const { song } = this.state;
    if(!song) {
      return <p>LOADING!</p>
    }
    else {
      return (
        <div className="container">

          <h1>hey</h1>
          <h1>{song.Name}</h1>

        </div>
      )

    }
  }
}

module.exports = Song_Instance;
