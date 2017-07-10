var React = require('react');
var api = require('../api.js');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
import { PageHeader, Pagination, Tabs, Tab } from 'react-bootstrap';

var orderByAsc = [{'field': 'Name', 'direction': 'asc'}];

function ResultGrid(props) {
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

class Search extends React.Component{
  constructor(props) {
    super();
    this.state = {
      searchResults: null,
      activePage: 1,
      numPages: 0
    }
    this.updateSearchResults = this.updateSearchResults.bind(this);
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

    this.setState(function() {
      return {
        searchResults: searchResults
      }
    });
        
    filter = [{'name': 'Name','op': 'eq', 'val': this.props.searchString[0]}];

    api.getArtists(this.state.activePage, filter, orderByAsc)
      .then(function (data) {
        this.setState(function () {
          return {
            searchResults: data.objects,
            numPages: data.total_pages
          }
        });
      }.bind(this));
  }
  render(){
    return(
      <div>

        {!this.state.searchResults
          ? <p>LOADING</p>
          : <ResultGrid artists={this.state.searchResults} />}
      </div>
      );
  }
}

module.exports = Search;