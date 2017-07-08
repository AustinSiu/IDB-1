var React = require('react');
var api = require('../api');

class Album_Instance extends React.Component {

  constructor(props) {
    super();
    this.state = {
      album: null
    };
  }

  componentDidMount() {
    this.updateAlbum(this.state.album);
  }

  updateAlbum(a){
    var albumID = this.props.match.params.albumID;

    this.setState(function() {
      return {
        album: a
      }
    });

    api.getAlbum(albumID)
      .then(function(a) {
        console.log(a)
        this.setState(function () {
          return {
            album: a
          }
        });
      }.bind(this));
  }

  render() {
    console.log(JSON.stringify(this.state.album))
    console.log(this.state.album)
    const { album } = this.state;
    if(!album) {
      return <p>LOADING!</p>
    }
    else {
      return (
        <div className="container">

          <h1>hey</h1>
          <h1>{album.Title}</h1>

        </div>
      )

    }
  }
}

module.exports = Album_Instance;
