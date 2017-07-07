var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api');
var Grid = require('./Grid');

function SelectGenre (props) {
  var genres = ["Show All", "Alternative", "Blues", "Country", "Electronic", "Indie", "Rap", "Rock"];
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
    api.getArtists("Show All")
      .then(function(artists) {
        this.setState(function() {
          return {
            artists: artists
          }
        })
      }.bind(this))
  }

  render() {
    var genres = ["Show All", "Alternative", "Blues", "Country", "Electronic", "Indie", "Rap", "Rock"];
    var sort = ["Ascending", "Descending"];

    return (
      <div>
        <SelectGenre
        currentFilter = {this.state.currentFilter}
        onSelect = {this.updateFilter}/>

        {!this.state.artists 
          ? <p>LOADING</p> 
          : <Grid artists={this.state.artists}/>}
      </div>
    )
  }
}

module.exports = Artists;