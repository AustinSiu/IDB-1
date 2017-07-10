var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api');
var Link = require('react-router-dom').Link;
import {Pagination} from 'pui-react-pagination';

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
      itemsPerPage: 10
    };

    this.updateFilter = this.updateFilter.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }
  componentDidMount() {
    this.updateFilter(this.state.currentFilter)
  }
  updateFilter(filter) {
    this.setState(function() {
      return {
        currentFilter: filter,
        albums: null,
        activePage: 1,
      }
    });
    api.getAlbums(filter)
      .then(function(albums) {
        this.setState(function() {
          return {
            albums: albums
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
      .then(function(albums) {
        this.setState(function() {
          return {
            albums: albums
          }
        })
      }.bind(this))
  }

  handleSelect(event, selectedEvent) {
    const eventKey = selectedEvent.eventKey;
    const curPage = this.state.activePage;

    if(eventKey === 'next') {
      console.log(eventKey)
      this.setState({activePage: curPage + 1});
    }
    else if(eventKey === 'prev') {
      this.setState({activePage: curPage - 1});
    }
    else {
      this.setState({activePage: eventKey});
      console.log(eventKey)
      console.log(this.state.activePage)
      console.log(curPage)
    }
    this.setState({activePage: selectedEvent.eventKey});
    api.getAlbums(this.state.currentFilter, this.state.currentSort, eventKey)
      .then(function(albums) {
        this.setState(function() {
          return {
            albums: albums
          }
        })
      }.bind(this))
  }
  updateStatus(status) {
    this.setState(function() {
      return {
        albums: status
      }
    });

    api.getAlbums("Show All")
      .then(function(albums) {
        this.setState(function() {
          return {
            albums: albums,
            numPages: 5
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
