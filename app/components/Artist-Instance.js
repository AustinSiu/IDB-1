var React = require('react');
var api = require('../api');
var Link = require('react-router-dom').Link;
import { FormGroup, FormControl } from 'react-bootstrap';


class Artist_Instance extends React.Component {

  constructor(props) {
    super();
    this.state = {
      artist: null,
      isEditing: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleCancel = this.toggleCancel.bind(this);
    this.toggleSubmit = this.toggleSubmit.bind(this);

  }

  componentDidMount() {
    this.updateArtist(this.state.artist);
  }
  toggleEdit() {
    this.setState({isEditing: true});
  }
  toggleCancel() {
    this.setState({isEditing: false});
  }
  toggleSubmit() {
    this.setState({isEditing: false});
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

  handleSubmit(event){
    event.preventDefault();
    api.editArtist(artistID)
      .then(function(a) {
        console.log(a)
        this.setState(function (){
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

            {!this.state.isEditing
             ?<div>
                <button onClick={this.toggleEdit} className="my-button">edit</button>
                <h1>Artist:{artist.Name}</h1>
              </div>
             :<div>
                  <button onClick={this.toggleCancel} className="my-button">cancel</button>
                  <br></br>
                  <button onClick={this.toggleSubmit} className="my-button">submit</button>
                 <h1>Artist:
                 <form onSubmit={this.handleSubmit}>
                <FormGroup
                  controlId="formBasicText"
                  >
                  <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder={artist.Name}
                  />
                </FormGroup>
              </form>
                </h1>
              </div>
          }

          <img
            className='img'
            src={artist.Image}
            alt={'Image for ' + artist.Name}/>
          <ul>
            <li>Genre(s): 
              <ul className='genre'>
                {artist.ArtistGenre.map(function(genre) {
                  return (
                    <li key={genre.GID} className='genre'>{genre.Name}, </li>
                  )
                })}
              </ul>
            </li>
            <li>Years Active: {artist.Start_Time} - {artist.End_Time} ({artist.End_Time - artist.Start_Time} years) </li>
            <h3>Top Songs:</h3>
            {artist.TopSongs.map(function(song) {
              return (
                <li key={song.SongID}>
                  <Link to={'/song-instance/' + song.SongID}>
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
            })}
            <h3>Albums:</h3>
            {artist.Albums.map(function(album) {
              return (
                <li key={album.AlbumID}>
                  <Link to={'/album-instance/' + album.AlbumID}>
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
            })}
            <h3>Tours:</h3>
            {artist.Tours.map(function(tour) {
              return (
                <li key={tour.TourID}>
                  <Link to={'/tour-instance/' + tour.TourID}>
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
            })}
            <h3>All Songs:</h3>
            {artist.Songs.map(function(song) {
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

module.exports = Artist_Instance;
