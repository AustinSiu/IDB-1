var React = require('react');
var api = require('../api');
var Link = require('react-router-dom').Link;

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

          <h1>Album: {album.Title}</h1>
          <img
            className='img'
            src={album.Image}
            alt={'Image for ' + album.Title}/>
          <ul>
            <li>Release Date: {album.Year}</li>
            <li>Songs: 
              <Link to={'/song-instance/' + album.Songs[0].SongID}>
                {album.Songs[0].Name}
              </Link></li>            
            <li>Artist: 
              <Link to={'/artist-instance/' + album.ArtistID}>
                {album.artist.Name}
              </Link></li>  
          </ul>

        </div>
      )

    }
  }
}

module.exports = Album_Instance;
