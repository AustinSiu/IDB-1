var React = require('react');
var PropTypes = require('prop-types');


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
SelectGenre.propType = {
  currentFilter: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

class Artists extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: "Show All",
    };

    this.updateFilter = this.updateFilter.bind(this);
  }
  updateFilter(genre) {
    this.setState(function() {
      return {
        currentFilter: genre,
      }
    });
  }

  render() {
    var genres = ["Show All", "Alternative", "Blues", "Country", "Electronic", "Indie", "Rap", "Rock"];
    var sort = ["Ascending", "Descending"];

    return (
      <div>
        <SelectGenre
        currentFilter = {this.state.currentFilter}
        onSelect = {this.updateFilter}/>
      </div>
    )
  }
}

module.exports = Artists;