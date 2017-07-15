var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;


function ContextSearch(props) {
  const { searchString } = props;
  var re = new RegExp(searchString[0], 'i');
  var context = [];
  JSON.parse(JSON.stringify(props.data), (key, value) => {
      if(re.test(value)) {
        var idx = value.toString().search(re);
        context.push (
          <li key={key} >
            {key + " : "}
            {value.slice(0, idx)}
            <mark> 
              {value.toString().slice(idx, idx + searchString[0].length)}
            </mark>
            {value.slice(idx + searchString[0].length, value.length)}
          </li>
        );
      }
      return key;
    })
  return (
    <div>
      {context}
    </div>
  )
}
SearchResultsGrid.propTypes = {
  data : PropTypes.array.isRequired,
  searchString : PropTypes.array.isRequired,  
};

function SearchResultsGrid(props) {
  if (!props.data[0]) {
    return (<h2 className="subtitle">No results found</h2>)
  }
  const { searchString } = props;
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
                  <br/>
                  <ContextSearch  data = {album}
                                  searchString = {searchString} />
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
                  <br/>
                  <ContextSearch  data = {artist}
                                  searchString = {searchString} />
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
                  <br/>
                  <ContextSearch  data = {song}
                                  searchString = {searchString} />
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
                  <br/>
                  <ContextSearch  data = {tour}
                                  searchString = {searchString} />
                </Link>
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }
}
SearchResultsGrid.propTypes = {
  data : PropTypes.array.isRequired,
  module : PropTypes.string.isRequired,
  searchString : PropTypes.array.isRequired,  
};

module.exports = SearchResultsGrid;
