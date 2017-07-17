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
    const {artistIdUrl} = "/edit/artist/"+"{artist.ArtistID}";
    if(!artist) {
      return <p>LOADING!</p>
    }
    else {
      return (
        <div className="container">
          <a href={'http://127.0.0.1:5000/edit/artist' + '/' + artist.ArtistID}><button>Edit</button></a>
          <h1>Artist: {artist.Name}</h1>
          <img
            className='img'
            src={artist.Image}
            alt={'Image for ' + artist.Name}/>
          <ul>
            <li>Genre(s):
              <ul>
                {artist.ArtistGenre.map(function(genre) {
                  return (
                    <li key={genre.GID}>{genre.Name}</li>
                  )
                })}
              </ul>
            </li>
            <li>Years Active: {artist.Start_Time} - {artist.End_Time} ({artist.End_Time - artist.Start_Time} years) </li>
            <h3>Top Songs:</h3>
            {artist.TopSongs.map(function(song) {
              if (song.SongID) {
                return (
                  <li key={song.SongID}>
                    <Link to={'/songs/' + song.SongID}>
                      <img
                        className='img'
                        src={song.Image}
                        alt={'Image for ' + song.Name}/>
                      <br/>
                      {song.Name}<br/>
                    </Link>
                    Peak Chart Position: {song.Chart_Position} <br/>
                    Release Date: {song.Creation_Date}
                    <p></p>
                  </li>
                )
              }
            })}
            <h3>Albums:</h3>
            {artist.Albums.map(function(album) {
              if (album.AlbumID) {
                return (
                  <li key={album.AlbumID}>
                    <Link to={'/albums/' + album.AlbumID}>
                      <img
                        className='img'
                        src={album.Image}
                        alt={'Image for ' + album.Title}/>
                      <br/>
                      {album.Title}<br/>
                    </Link>
                    <p></p>
                  </li>
                )
              }
            })}
            <h3>Tours:</h3>
            {artist.Tours.map(function(tour) {
              if (tour.TourID) {
                return (
                  <li key={tour.TourID}>
                    <Link to={'/tours/' + tour.TourID}>
                      <img
                        className='img'
                        src={tour.Image}
                        alt={'Image for ' + tour.Name}/>
                      <br/>
                      {tour.Name}<br/>
                    </Link>
                    {tour.tDate}
                  </li>
                )
              }
            })}
            <h3>All Songs:</h3>
            {artist.Songs.map(function(song) {
              if (song.SongID) {
                return (
                  <li key={song.SongID}>
                    <Link to={'/songs/' + song.SongID}>
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
              }
            })}
          </ul>

        </div>
      )

    }
  }
}

module.exports = Artist_Instance;
