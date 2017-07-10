var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api');
var Link = require('react-router-dom').Link;
import {Pagination} from 'pui-react-pagination';

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

function SelectSort (props) {
  var sorts = ["asc", "desc"];
  return (
    <ul className="options">
      {sorts.map((sort) => {
        return (
          <li 
          style={sort === props.currentSort? {color: '#d0021b'} : null}
          onClick={props.onSelect.bind(null, sort)}
          key={sort}>
            {sort}
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
SongGrid.propTypes = {
  songs : PropTypes.array.isRequired,
};

class Albums extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: "Show All",
      currentSort: "asc",
      songs: null,
      activePage: 1,
      numPages: 50,
    };

    this.updateFilter = this.updateFilter.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {  
    this.updateFilter(this.state.currentFilter)
  }
  updateFilter(genre) {
    this.setState(function() {
      return {
        currentFilter: genre,
        songs: null,
        activePage: 1,
      }
    });
    api.getSongs(genre)
      .then(function(songs) {
        this.setState(function() {
          return {
            songs: songs
          }
        })
      }.bind(this))
  }
  updateSort(sort) {
    this.setState(function() {
      return {
        currentSort: sort,
        activePage: 1,
    }})
    api.getAlbums(this.state.currentFilter, sort)
      .then(function(songs) {
        this.setState(function() {
          return {
            songs: songs
          }
        })
      }.bind(this))
  }
  handleSelect(event, selectedEvent) {
    const eventKey = selectedEvent.eventKey;
    const curPage = this.state.activePage;

    if(eventKey === 'next') {
      this.setState({activePage: curPage + 1});
    }
    else if(eventKey === 'prev') {
      this.setState({activePage: curPage - 1});
    }
    else {
      this.setState({activePage: eventKey});
    }
    this.setState({activePage: selectedEvent.eventKey});
    api.getSongs(this.state.currentFilter, this.state.currentSort, eventKey)
      .then(function(songs) {
        this.setState(function() {
          return {
            songs: songs
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
        <SelectSort
        currentSort={this.state.currentSort}
        onSelect= {this.updateSort}/>

        {!this.state.songs 
          ? <p>LOADING</p> 
          : <SongGrid songs={this.state.songs} />}

        <Pagination items={this.state.numPages}
                    next={false}
                    prev={false}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect.bind(this)} />

      </div>
    )
  }
}

module.exports = Albums;