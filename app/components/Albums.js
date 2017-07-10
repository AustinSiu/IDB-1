var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api');
var Link = require('react-router-dom').Link;
import {Pagination} from 'pui-react-pagination';

var orderByAsc = [{'field': 'Title', 'direction': 'asc'}];
var orderByDsc = [{'field': 'Title', 'direction': 'desc'}];

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
                <Link to={'/album-instance/' + album.AlbumID}>
                  <li>
                    <img
                      className='img'
                      src={album.Image}
                      alt={'Image for ' + album.Title}/>
                  </li>
                  <li>{album.Title}</li>
                </Link>
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

class Albums extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: "Show All",
      currentSort: "asc",
      albums: null,
      activePage: 1,
      numPages: 16,
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
        albums: null,
        activePage: 1,
      }
    });
    var filter;
    api.getAlbums(1, filter, orderByAsc)
      .then(function(data) {
        this.setState(function() {
          return {
            albums: data.objects,
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
    var order_by;
    if (sort === 'asc') {
      order_by = orderByAsc; 
    } else {
      order_by = orderByDsc
    }
    api.getAlbums(1, filter, order_by)
      .then(function(data) {
        this.setState(function() {
          return {
            albums: data.objects,
            numPages: data.total_pages,
          }
        })
      }.bind(this))
  }
  handleSelect(event, selectedEvent) {
    const eventKey = selectedEvent.eventKey;
    const curPage = this.state.activePage;

    this.setState(function() {
      return {
        activePage: eventKey,
      }
    })

    var filter;
    var order_by;
    if (this.state.currentSort === 'asc') {
      order_by = orderByAsc; 
    } else {
      order_by = orderByDsc
    }
    api.getAlbums(eventKey, filter, order_by)
      .then(function(data) {
        this.setState(function() {
          return {
            albums: data.objects,
            numPages: data.total_pages,
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
        <SelectSort
        currentSort={this.state.currentSort}
        onSelect= {this.updateSort}/>

        {!this.state.albums
          ? <p>LOADING</p>
          : <AlbumGrid albums={this.state.albums} />}

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
