var React = require('react');
var api = require('../api.js');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var Grid = require('./Grid.js');
import {Pagination} from 'react-bootstrap';

var orderArtists = [{'field': 'Name', 'direction': 'asc'}];
var orderAlbums = [{'field': 'Title', 'direction': 'asc'}];

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
    else if (this.props.moduleType == "Tours") {
      filter = [{"or": [
                  {'name': 'Name','op': 'ilike', 'val': "%" + this.props.searchString[0] + "%"},
                  {'name': 'Venue','op': 'ilike', 'val': "%" + this.props.searchString[0] + "%"},
                  {'name': 'Locations','op': 'ilike', 'val': "%" + this.props.searchString[0] + "%"},
                  {'name': 'tDate','op': 'ilike', 'val': "%" + this.props.searchString[0] + "%"},
                  {'name': 'artist','op': 'has', 'val': {'name': 'Name', 'op': 'ilike', 'val' : "%" + this.props.searchString[0] + "%"}},
                ]}]
      api.getTours(this.state.activePage, filter, orderArtists)
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
    console.log(this.state.numPages)
    return(
      <div className='center-pagination'>
        {!this.state.searchResults
          ? <p>LOADING</p>
          : <Grid data={this.state.searchResults}
                        module= {this.props.moduleType} />}
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
      );
  }
}

module.exports = Search;
