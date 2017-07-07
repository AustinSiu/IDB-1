var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api');

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

function SongGrid(props) {
  return(
    <ul className="data-list">
      {props.songs.map(function (song) {
        return (
          <li key={song.SongID} className='data-item'>
            <ul className='data-list-items'>
              <li>
                <img
                  className='img'
                  src={song.Image}
                  alt={'Image for ' + song.Name}/>
              </li>
              <li>{song.Name}</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
SongGrid.propTypes = {
  songs : PropTypes.array.isRequired,
};

class Albums extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: "Show All",
      songs: null,
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
        songs: null,
      }
    });
    api.getSongs("Show All")
      .then(function(songs) {
        this.setState(function() {
          return {
            songs: songs
          }
        })
      }.bind(this))
  }

  render() {
    var genres = ["Show All", "Alternative", "Blues", "Country", "Electronic", "Indie", "Rap", "Rock"];

    return (
      <div>
        <SelectGenre
        currentFilter = {this.state.currentFilter}
        onSelect = {this.updateFilter}/>

        {!this.state.songs 
          ? <p>LOADING</p> 
          : <SongGrid songs={this.state.songs} />}
      </div>
    )
  }
}

module.exports = Albums;