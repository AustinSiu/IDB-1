var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api');

function SelectGenre (props) {
  var genres = ["Show All", "alternative", "blues", "country", "electronic", "indie", "rap", "rock"];
  return (
    <ul className="options">
      {genres.map((genre) => {
        return (
          <li 
          style={genre === props.currentFilter ? {color: '#d0021b'} : null}
          onClick={props.onSelect.bind(null, genre)}
          key={genre}>
            {genre}
          </li>
        )
      })}
    </ul>
  )
}
SelectGenre.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function ArtistGrid(props) {
  console.log(props.artists)
  return(
    <ul className="data-list">
      {props.artists.map(function (artist) {
        return (
          <li key={artist.ArtistID} className='data-item'>
            <ul className='data-list-items'>
              <li>
                <img
                  className='img'
                  src={artist.Image}
                  alt={'Image for ' + artist.Name}/>
              </li>
              <li>{artist.Name}</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
ArtistGrid.propTypes = {
  artists : PropTypes.array.isRequired,
};

class Artists extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: "Show All",
      artists: null,
    };

    this.updateFilter = this.updateFilter.bind(this);
  }
  componentDidMount() {  
    this.updateFilter(this.state.currentFilter)
  }
  updateFilter(genre) {
    this.setState(function() {
      return {
        currentFilter: genre,
        artists: null,
      }
    });
    api.getArtists(genre)
      .then(function(artists) {
        this.setState(function() {
          return {
            artists: artists
          }
        })
      }.bind(this))
  }

  render() {

    return (
      <div>
        <SelectGenre
        currentFilter = {this.state.currentFilter}
        onSelect = {this.updateFilter}/>

        {!this.state.artists 
          ? <p>LOADING</p> 
          : <ArtistGrid artists={this.state.artists} />}
      </div>
    )
  }
}

module.exports = Artists;