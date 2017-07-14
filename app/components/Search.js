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
    if (this.props.moduleType == "Artists") {
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
    else if (this.props.moduleType == "Albums") {
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
    else if (this.props.moduleType == "Songs") {
      for(var i = 0; i < searchString.length; i++) {
        filter += '{"or":[' +
                  '{"name":"Name","op":"ilike","val":"%' + this.props.searchString[0] + '%"}, ' +
                  '{"name":"SongGenre","op":"any","val":{"name":"Name","op":"ilike","val":"%' + this.props.searchString[0] + '%"}}, ' +
                  '{"name":"album","op":"has","val":{"name":"Title","op":"ilike","val":"%' + this.props.searchString[0] + '%"}}, ' +
                  '{"name":"artist","op":"has","val":{"name":"Name","op":"ilike","val":"%' + this.props.searchString[0] + '%"}} ' +
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
    else if (this.props.moduleType == "Tours") {
      for(var i = 0; i < searchString.length; i++) {
        filter += '{"or":[' +
                  '{"name":"Name","op":"ilike","val":"%' + this.props.searchString[0] + '%"}, ' +
                  '{"name":"Venue","op":"ilike","val":"%' + this.props.searchString[0] + '%"}, ' + 
                  '{"name":"Locations","op":"ilike","val":"%' + this.props.searchString[0] + '%"}, ' + 
                  '{"name":"tDate","op":"ilike","val":"%' + this.props.searchString[0] + '%"}, ' + 
                  '{"name":"artist","op":"has","val":{"name":"Name","op":"ilike","val":"%' + this.props.searchString[0] + '%"}} ' +
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
