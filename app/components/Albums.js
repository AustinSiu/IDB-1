var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api');
var Link = require('react-router-dom').Link;
import { PageHeader, Pagination, Button,
		 ButtonGroup, ButtonToolbar,
		 Grid, Row, Col } from 'react-bootstrap';
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
      numPages: 0,
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
  updateSort(sort) {
    this.setState(function() {
      return {
        currentSort: sort,
    }})
    if (sort === "asc") {
      this.setState(function() {
        return {
          currentSort: sort,
          albums: this.state.albums.sort(function(a, b){
            if (a.Title > b.Title) {
              return 1
            } else {
              return -1
            }
        })
      }})
    }
    else {
      this.setState(function() {
        return {
          currentSort: sort,
          albums: this.state.albums.sort(function(a, b){
            if (a.Title < b.Title) {
              return 1
            } else {
              return -1
            }
        })
      }})
    }
  }

  handleSelect(eventKey) {
   this.setState({activePage: eventKey}, function(){
     this.updateStatus(null);
   });
  //  var query = this.props.location.query;
  //  query.page = eventKey;
  //  ProductStore.fetchProductList(query);
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
            albums: albums.objects,
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
            onSelect={this.handleSelect}/>
      </div>
    )
  }
}

module.exports = Albums;
