var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api');
var Link = require('react-router-dom').Link;
import {Pagination} from 'pui-react-pagination';

var orderByAsc = [{'field': 'Name', 'direction': 'asc'}];
var orderByDsc = [{'field': 'Name', 'direction': 'desc'}];

function SelectGenre (props) {
  var genres = ["Show All", "Alternative", "Blues", "Country", "Electronic", "Indie", "Rap", "Rock"];
  return (
    <ul className="my-button">
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
  var sorts = ["asc", "desc"];
  return (
    <ul className="my-button">
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

function ArtistGrid(props) {
  console.log(props.artists)
  return(
    <ul className="data-list">
      {props.artists.map(function (artist) {
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
ArtistGrid.propTypes = {
  artists : PropTypes.array.isRequired,
};

class Artists extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: "Show All",
      currentSort: "asc",
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
    api.getArtists(1, filter, orderByAsc)
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
    if (sort === 'asc') {
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
    if (this.state.currentSort === 'asc') {
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
      <div>
        <SelectGenre
        currentFilter = {this.state.currentFilter}
        onSelect = {this.updateFilter}/>
        <SelectSort
        currentSort={this.state.currentSort}
        onSelect= {this.updateSort}/>

        {!this.state.artists
          ? <p>LOADING</p>
          : <ArtistGrid artists={this.state.artists} />}

        <Pagination items={this.state.numPages}
                    next={false}
                    prev={false}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect.bind(this)} />
      </div>
    )
  }
}

module.exports = Artists;
