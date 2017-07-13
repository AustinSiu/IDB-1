var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function Grid(props) {
  if (!props.data[0]) {
    return (<h2 className="subtitle">No results found</h2>)
  }  
  if (props.module === "Albums"){
    return(
      <ul className="data-list">
        {props.data.map(function (album) {
          return (
            <li key={album.AlbumID} className='data-item'>
              <ul className='data-list-items'>
                  <Link to={'/album-instance/' + album.AlbumID}>
                    <li>
                      <img
                        className='img'
                        src={album.Image}
                        alt={'Image for ' + album.Title}/>
                    </li>
                    <li>{album.Title}</li>
                  </Link>
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }
  else if (props.module === "Artists") {
    return(
      <ul className="data-list">
        {props.data.map(function (artist) {
          return (
            <li key={artist.ArtistID} className='data-item'>
              <ul className='data-list-items'>
                <Link to={'/artist-instance/' + artist.ArtistID}>
                  <li>
                    <img
                      className='img'
                      src={artist.Image}
                      alt={'Image for ' + artist.Name}/>
                  </li>
                  <li>{artist.Name}</li>
                </Link>
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }
  else if (props.module === "Songs") {
    return(
      <ul className="data-list">
        {props.data.map(function (song) {
          return (
            <li key={song.SongID} className='data-item'>
              <ul className='data-list-items'>
                <Link to={'/song-instance/' + song.SongID}>
                  <li>
                    <img
                      className='img'
                      src={song.Image}
                      alt={'Image for ' + song.Name}/>
                  </li>
                  <li>{song.Name}</li>
                </Link>
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }
  else if (props.module === "Tours") {
    return(
      <ul className="data-list">
        {props.data.map(function (tour) {
          return (
            <li key={tour.TourID} className='data-item'>
              <ul className='data-list-items'>
                  <Link to={'/tour-instance/' + tour.TourID}>
                    <li>
                      <img
                        className='img'
                        src={tour.Image}
                        alt={'Image for ' + tour.Name}/>
                    </li>
                    <li>{tour.Name}</li>
                  </Link>
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }
}
Grid.propTypes = {
  data : PropTypes.array.isRequired,
  module : PropTypes.string.isRequired,
};

module.exports = Grid;
