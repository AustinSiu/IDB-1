var React = require('react');
var api = require('../api.js');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var SearchResultsGrid = require('./SearchResultsGrid.js');
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
  componentWillReceiveProps(nextProps){
    if((nextProps.searchString != this.props.searchString)) {
      this.props = nextProps;
      this.updateSearchResults(null);
    }
  }
  updateSearchResults(searchResults) {
    var filter;
    const { searchString } = this.props;
    const { searchType } = this.props;
    this.setState(function() {
      return {
        searchResults: searchResults
      }
    });
    var filter = '[{"' + searchType + '":[';      
    if (this.props.moduleType == "artists") {
      for(var i = 0; i < searchString.length; i++) {
        filter += '{"or":[' +
                  '{"name":"Name","op":"ilike","val":"%' + searchString[i] + '%"}, ' +
                  '{"name":"ArtistGenre","op":"any","val":{"name":"Name","op":"ilike","val":"%' + searchString[i] + '%"}}, ' +
                  '{"name":"Albums","op":"any","val":{"name":"Title","op":"ilike","val":"%' + searchString[i] + '%"}}, ' +
                  '{"name":"Songs","op":"any","val":{"name":"Name","op":"ilike","val":"%' + searchString[i] + '%"}}' +
                  ']}';
        if(i != searchString.length - 1) {
          filter += ",";
        }
      }
      filter += "]}]";
      filter = JSON.parse(filter)
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
    else if (this.props.moduleType == "albums") {
      for(var i = 0; i < searchString.length; i++) {
        filter += '{"or":[' +
                  '{"name":"Title","op":"ilike","val":"%' + searchString[i] + '%"}, ' +
                  '{"name":"artist","op":"has","val":{"name":"Name","op":"ilike","val":"%' + searchString[i] + '%"}}, ' +
                  '{"name":"Songs","op":"any","val":{"name":"Name","op":"ilike","val":"%' + searchString[i] + '%"}} ' +
                  ']}';
        if(i != searchString.length - 1) {
          filter += ",";
        }
      }
      filter += "]}]";
      filter = JSON.parse(filter)
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
    else if (this.props.moduleType == "songs") {
      for(var i = 0; i < searchString.length; i++) {
        filter += '{"or":[' +
                  '{"name":"Name","op":"ilike","val":"%' + searchString[i]  + '%"}, ' +
                  '{"name":"SongGenre","op":"any","val":{"name":"Name","op":"ilike","val":"%' + searchString[i]  + '%"}}, ' +
                  '{"name":"album","op":"has","val":{"name":"Title","op":"ilike","val":"%' + searchString[i]  + '%"}}, ' +
                  '{"name":"artist","op":"has","val":{"name":"Name","op":"ilike","val":"%' + searchString[i]  + '%"}} ' +
                  ']}';
        if(i != searchString.length - 1) {
          filter += ",";
        }
      }
      filter += "]}]";
      filter = JSON.parse(filter)
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
    else if (this.props.moduleType == "tours") {
      for(var i = 0; i < searchString.length; i++) {
        filter += '{"or":[' +
                  '{"name":"Name","op":"ilike","val":"%' + searchString[i]  + '%"}, ' +
                  '{"name":"Venue","op":"ilike","val":"%' + searchString[i]  + '%"}, ' + 
                  '{"name":"Locations","op":"ilike","val":"%' + searchString[i]  + '%"}, ' + 
                  '{"name":"tDate","op":"ilike","val":"%' + searchString[i]  + '%"}, ' + 
                  '{"name":"artist","op":"has","val":{"name":"Name","op":"ilike","val":"%' + searchString[i]  + '%"}} ' +
                  ']}';
        if(i != searchString.length - 1) {
          filter += ",";
        }
      }
      filter += "]}]";
      filter = JSON.parse(filter)
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
    this.setState({activePage: eventKey}, function () {
      this.updateSearchResults(null);
    });
  }
  render(){
    const { searchString } = this.props;
    return(
      <div className='center-pagination'>
        {!this.state.searchResults
          ? <p>LOADING</p>
          : <SearchResultsGrid  data={this.state.searchResults}
                                module= {this.props.moduleType} 
                                searchString={searchString} />}
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
