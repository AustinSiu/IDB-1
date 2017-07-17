var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api');
var Link = require('react-router-dom').Link;
var Grid = require('./Grid.js')
import {Pagination} from 'react-bootstrap';

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
          style={genre === props.currentFilter ? {border: '1px solid #fd5927', color:'#fd5927'} : null}
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
          style={sort === props.currentSort? {border: '1px solid #fd5927', color:'#fd5927'} : null}
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

class Artists extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: "Show All",
      currentSort: "Ascending",
      artists: null,
      activePage: 1,
      numPages: 6,
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
        artists: null,
        activePage: 1,
      }
    });
    var filter;
    if (genre !== "Show All") {
      filter = [{'name': 'ArtistGenre','op': 'any', 'val':{"name":"Name","op":"ilike","val":genre}}];
    }
    var order_by;
    if (this.state.currentSort === 'Ascending') {
      order_by = orderByAsc;
    } else {
      order_by = orderByDsc
    }
    api.getArtists(1, filter, order_by)
      .then(function(data) {
        this.setState(function() {
          return {
            artists: data.objects,
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
      filter = [{'name': 'ArtistGenre','op': 'any', 'val':{"name":"Name","op":"ilike","val":this.state.currentFilter}}];;
    }
    var order_by;
    if (sort === 'Ascending') {
      order_by = orderByAsc;
    } else {
      order_by = orderByDsc
    }
    api.getArtists(1, filter, order_by)
      .then(function(data) {
        this.setState(function() {
          return {
            artists: data.objects,
            numPages: data.total_pages,
          }
        })
      }.bind(this))
  }
  handleSelect(eventKey) {
    this.setState({activePage: eventKey});
    var filter;
    if (this.state.currentFilter !== "Show All") {
      filter = [{'name': 'ArtistGenre','op': 'any', 'val':{"name":"Name","op":"ilike","val":this.state.currentFilter}}];;
    }
    var order_by;
    if (this.state.currentSort === 'Ascending') {
      order_by = orderByAsc;
    } else {
      order_by = orderByDsc
    }
    api.getArtists(eventKey, filter, order_by)
      .then(function(data) {
        this.setState(function() {
          return {
            artists: data.objects,
            numPages: data.total_pages,
          }
        })
      }.bind(this))
  }

  render() {

    return (
      <div className='center-pagination'>
        <SelectGenre
        currentFilter = {this.state.currentFilter}
        onSelect = {this.updateFilter}/>
        <SelectSort
        currentSort={this.state.currentSort}
        onSelect= {this.updateSort}/>
        <a href="/add/artist"><button>Add</button></a>

        {!this.state.artists
          ? <p>LOADING</p>
          : <Grid data={this.state.artists}
                        module={"artists"} />}

        {!this.state.numPages
          ? null
          : <Pagination
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
        }

      </div>
    )
  }
}

module.exports = Artists;
