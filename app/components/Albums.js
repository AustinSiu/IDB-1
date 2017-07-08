var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api');
var Link = require('react-router-dom').Link;

function SelectGenre (props) {
  var filters = ["Show All"];
  return (
    <ul className="options">
      {filters.map((filter) => {
        return (
          <li
          style={filter === props.currentFilter ? {color: '#d0021b'} : null}
          onClick={props.onSelect.bind(null, filter)}
          key={filter}>
            {filter}
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

function AlbumGrid(props) {
  return(
    <ul className="data-list">
      {props.albums.map(function (album) {
        return (
          <li key={album.AlbumID} className='data-item'>
            <ul className='data-list-items'>
              <li>
                <Link to={'/album-instance/' + album.AlbumID}>
                  <img
                    className='img'
                    src={album.Image}
                    alt={'Image for ' + album.Title}/>
                </Link>
              </li>
              <li>{album.Title}</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
AlbumGrid.propTypes = {
  albums : PropTypes.array.isRequired,
};

class Albums extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: "Show All",
      albums: null,
    };

    this.updateFilter = this.updateFilter.bind(this);
  }
  componentDidMount() {
    this.updateFilter(this.state.currentFilter)
  }
  updateFilter(filter) {
    this.setState(function() {
      return {
        currentFilter: filter,
        albums: null,
      }
    });
    api.getAlbums("Show All")
      .then(function(albums) {
        this.setState(function() {
          return {
            albums: albums
          }
        })
      }.bind(this))
  }

  render() {
    const { album } = this.state;
    return (
      <div>
        <SelectGenre
        currentFilter = {this.state.currentFilter}
        onSelect = {this.updateFilter}/>

        {!this.state.albums
          ? <p>LOADING</p>
          : <AlbumGrid albums={this.state.albums} />}

      </div>
    )
  }
}

module.exports = Albums;
