var React = require('react');
var api = require('../api.js');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
import {Pagination} from 'react-bootstrap';

var orderArtists = [{'field': 'Name', 'direction': 'asc'}];
var orderAlbums = [{'field': 'Title', 'direction': 'asc'}];

function ResultGrid(props) {
  return(
    <ul className="data-list">
      {props.artists.map(function (artist, index) {
        return (
          <li key={index} className='data-item'>
            <ul className='data-list-items'>
              <Link to={'/artist-instance/' + artist.ArtistID}>
                <li>
                  <img
                    className='img'
                    src={artist.Image}
                    alt={'Image for ' + artist.Name}/>
                </li>
                <li>{artist.Name ? artist.Name : artist.Title}</li>
              </Link>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
ResultGrid.propTypes = {
  artists : PropTypes.array.isRequired,
};

class Search extends React.Component{
  constructor(props) {
    super();
    this.state = {
      searchResults: null,
      activePage: 1,
      numPages: 0
    }
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillMount() {
      this.updateSearchResults(null);
  }
  componentWillReceiveProps(newProps){
    if((newProps.searchString != this.props.searchString)) {
      this.props = newProps;
      this.updateSearchResults(null);
    }
  }
  updateSearchResults(searchResults) {
    var filter;
    const { searchString } = this.props;
    this.setState(function() {
      return {
        searchResults: searchResults
      }
    });
    if (this.props.moduleType == "Artists") {
      filter = [{"or": [
                  {'name': 'Name','op': 'ilike', 'val': "%" + this.props.searchString[0] + "%"},
                  {'name': 'ArtistGenre','op': 'any', 'val': {'name': 'Name', 'op': 'ilike', 'val' : "%" + this.props.searchString[0] + "%"}},
                  {'name': 'Albums','op': 'any', 'val': {'name': 'Title', 'op': 'ilike', 'val' : "%" + this.props.searchString[0] + "%"}},
                  {'name': 'Songs','op': 'any', 'val': {'name': 'Name', 'op': 'ilike', 'val' : "%" + this.props.searchString[0] + "%"}},
                ]}]
      api.getArtists(this.state.activePage, filter, orderArtists)
        .then(function (data) {
          this.setState(function () {
            return {
              searchResults: data.objects,
              numPages: data.total_pages
            }
          });
        }.bind(this));
    }
    else if (this.props.moduleType == "Albums") {
      filter = [{"or": [
                  {'name': 'Title','op': 'ilike', 'val': "%" + this.props.searchString[0] + "%"},
                  {'name': 'artist','op': 'has', 'val': {'name': 'Name', 'op': 'ilike', 'val' : "%" + this.props.searchString[0] + "%"}},
                  {'name': 'Songs','op': 'any', 'val': {'name': 'Name', 'op': 'ilike', 'val' : "%" + this.props.searchString[0] + "%"}},
                ]}]
      api.getAlbums(this.state.activePage, filter, orderAlbums)
        .then(function (data) {
          this.setState(function () {
            return {
              searchResults: data.objects,
              numPages: data.total_pages
            }
          });
        }.bind(this));
    }
    else if (this.props.moduleType == "Songs") {
      filter = [{"or": [
                  {'name': 'Name','op': 'ilike', 'val': "%" + this.props.searchString[0] + "%"},
                  {'name': 'SongGenre','op': 'any', 'val': {'name': 'Name', 'op': 'ilike', 'val' : "%" + this.props.searchString[0] + "%"}},
                  {'name': 'album','op': 'has', 'val': {'name': 'Title', 'op': 'ilike', 'val' : "%" + this.props.searchString[0] + "%"}},
                  {'name': 'artist','op': 'has', 'val': {'name': 'Name', 'op': 'ilike', 'val' : "%" + this.props.searchString[0] + "%"}},
                ]}]
      api.getSongs(this.state.activePage, filter, orderArtists)
        .then(function (data) {
          this.setState(function () {
            return {
              searchResults: data.objects,
              numPages: data.total_pages
            }
          });
        }.bind(this));
    }

  }
  handleSelect(eventKey){
    console.log("SS: handlePageSelect");
    this.setState({activePage: eventKey}, function () {
      this.updateSearchResults(null);
    });
  }
  render(){
    return(
      <div>
        {!this.state.searchResults
          ? <p>LOADING</p>
          : <ResultGrid artists={this.state.searchResults} />}

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
      );
  }
}

module.exports = Search;