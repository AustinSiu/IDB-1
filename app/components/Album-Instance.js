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
    const { album } = this.state;
    if(!album) {
      return <p>LOADING!</p>
    }
/*
Album X Image
      X Songs                 - Image
      X Title
      X Chart Position
      X Year (unformatted)
      X Artist                X Image
      - Label (null)

*/
    else {
      return (
        <div className="container">

          <h1>Album: {album.Title}</h1>
          <img
            className='img'
            src={album.Image}
            alt={'Image for ' + album.Title}/>
          <ul>
            <li>Artist: 
              <Link to={'/artist-instance/' + album.artist.ArtistID}>
              {album.artist.Name}
              </Link></li>
            <li>Release Date: {album.Year}</li>
            <li>Peak U.S. Chart Position: {album.US_Chart_Postion}</li>
            <h3>Songs:</h3>
            {album.Songs.map(function(song) {
              return (
                <li key={song.SongID}>
                  <Link to={'/song-instance/' + song.SongID}> 
                    <br/>
                    <img
                      className='img'
                      src={song.Image}
                      alt={'Image for ' + song.Name}/>
                    <br/>
                    {song.Name}
                  </Link>
                </li>
              )
            })}
          </ul>

        </div>
      )

    }
  }
}

module.exports = Album_Instance;
