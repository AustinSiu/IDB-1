var React = require('react');
var api = require('../api');
var Link = require('react-router-dom').Link;

class Artist_Instance extends React.Component {

  constructor(props) {
    super();
    this.state = {
      artist: null
    };
  }

  componentDidMount() {
    this.updateArtist(this.state.artist);
  }

  updateArtist(a){
    var artistID = this.props.match.params.artistID;

    this.setState(function() {
      return {
        artist: a
      }
    });

    api.getArtist(artistID)
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
          <img
            className='img'
            src={artist.Image}
            alt={'Image for ' + artist.Name}/>
          <ul>
            <li>Genre: {artist.ArtistGenre[0].Name}</li>
            <li>Songs: 
              <Link to={'/song-instance/' + artist.Songs[0].SongID}>
                {artist.Songs[0].SongID}
              </Link></li>
            <li>Album: 
              <Link to={'/album-instance/' + artist.Albums[0].AlbumID}>
                {artist.Albums[0].AlbumID}
              </Link></li>
          </ul>

        </div>
      )

    }
  }
}

module.exports = Artist_Instance;
