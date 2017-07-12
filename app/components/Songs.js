var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api');
var Link = require('react-router-dom').Link;
import { PageHeader, Pagination, Button,
     ButtonGroup, ButtonToolbar,
     Grid, Row, Col } from 'react-bootstrap';

var orderByAsc = [{'field': 'Name', 'direction': 'asc'}];
var orderByDsc = [{'field': 'Name', 'direction': 'desc'}];

function SelectGenre (props) {
  var genres = ["Show All", "Alternative", "Blues", "Country", "Electronic", "Indie", "Rap", "Rock"];
  return (
    <ul className="my-button">
      <p className='title'>Filter By: </p>
      {genres.map((genre) => {
        return (
          <li
          style={genre === props.currentFilter ? {color: '#fd5927'} : null}
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
  var sorts = ["Ascending", "Descending"];
  return (
    <ul className="my-button">
      <p className='title'>Sort By: </p>
      {sorts.map((sort) => {
        return (
          <li
          style={sort === props.currentSort? {color: '#fd5927'} : null}
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
      currentSort: "Ascending",
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
    var filter;
    if (genre !== "Show All") {
      filter = [{'name': 'SongGenre','op': 'any', 'val':{"name":"Name","op":"ilike","val":genre}}];;
    }
    api.getSongs(1, filter, orderByAsc)
      .then(function(data) {
        this.setState(function() {
          return {
            songs: data.objects,
            numPages: data.total_pages,
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
    var filter;
    if (this.state.currentFilter !== "Show All") {
      filter = [{'name': 'SongGenre','op': 'any', 'val':{"name":"Name","op":"ilike","val":this.state.currentFilter}}];;
    }
    var order_by;
    if (sort === 'Ascending') {
      order_by = orderByAsc;
    } else {
      order_by = orderByDsc
    }
    api.getSongs(1, filter, order_by)
      .then(function(data) {
        this.setState(function() {
          return {
            songs: data.objects,
            numPages: data.total_pages,
          }
        })
      }.bind(this))
  }
  handleSelect(eventKey) {
    this.setState({activePage: eventKey});
    var filter;
    if (this.state.currentFilter !== "Show All") {
      filter = [{'name': 'SongGenre','op': 'any', 'val':{"name":"Name","op":"ilike","val":this.state.currentFilter}}];;
    }
    var order_by;
    if (this.state.currentSort === 'Ascending') {
      order_by = orderByAsc;
    } else {
      order_by = orderByDsc
    }
    api.getSongs(eventKey, filter, order_by)
      .then(function(data) {
        this.setState(function() {
          return {
            songs: data.objects,
            numPages: data.total_pages,
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

        <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={this.state.numPages}
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handleSelect} />

      </div>
    )
  }
}

module.exports = Albums;
