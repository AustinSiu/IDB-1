var React = require('react');
var api = require('../api');
var Link = require('react-router-dom').Link;

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

          <h1>Song: {song.Name}</h1>
          <img
            className='img'
            src={song.Image}
            alt={'Image for ' + song.Title}/>
          <ul>
            <li>Release Date: {song.Creation_Date}</li>
            <li>Run Time: {song.Run_Time} seconds</li>
            <li>Genre: {song.SongGenre[0].Name}</li>
            <li>Artist: 
              <Link to={'/artist-instance/' + song.ArtistID}>
              {song.artist.Name}
              </Link></li>
            <li>Album: 
              <Link to={'/album-instance/' + song.AlbumID}>
              {song.album.Title}
              </Link></li>
          </ul>

        </div>
      )

    }
  }
}

module.exports = Song_Instance;
