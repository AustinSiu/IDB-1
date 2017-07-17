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
          <a href={'http://127.0.0.1:5000/edit/song' + '/' + song.SongID}><button>Edit</button></a>
          <h1>Song: {song.Name}</h1>
          <img
            className='img'
            src={song.Image}
            alt={'Image for ' + song.Title}/>
          <ul>
            <li>Release Date: {song.Creation_Date}</li>
            <li>Run Time: {song.Run_Time} seconds</li>
            {/* Will there ever be more than 1 song genre? */}
            <li>Genre: {song.SongGenre[0].Name}</li>
            <li>Peak U.S. Chart Position: {song.Chart_Position} </li>
            <li>
              <h3>Artist: </h3>
              <Link to={'/artists/' + song.artist.ArtistID}>
                <img
                  className='img'
                  src={song.artist.Image}
                  alt={'Image for ' + song.artist.Name}/>
                <br/>
                {song.artist.Name}
              </Link>
            </li>
            <li>
              <h3>Album: </h3>
              <Link to={'/albums/' + song.album.AlbumID}>
                <img
                  className='img'
                  src={song.album.Image}
                  alt={'Image for ' + song.album.Title}/>
                <br/>
                {song.album.Title}
              </Link>
            </li>
          </ul>

        </div>
      )

    }
  }
}

module.exports = Song_Instance;
