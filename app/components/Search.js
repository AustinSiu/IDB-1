var React = require('react');
var api = require('../api.js');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
import {Pagination} from 'react-bootstrap';

var orderArtists = [{'field': 'Name', 'direction': 'asc'}];
var orderAlbums = [{'field': 'Title', 'direction': 'asc'}];

function ResultGrid(props) {
  if (props.module === "Albums"){
    return(
      <ul className="data-list">
        {props.data.map(function (album) {
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
  else if (props.module === "Artists") {
    return(
      <ul className="data-list">
        {props.data.map(function (artist) {
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
  else if (props.module === "Songs") {
    return(
      <ul className="data-list">
        {props.data.map(function (song) {
          return (
            <li key={song.SongID} className='data-item'>
              <ul className='data-list-items'>
                <Link to={'/song-instance/' + song.SongID}>
                  <li>
                    <img
                      className='img'
                      src={song.Image}
                      alt={'Image for ' + song.Name}/>
                  </li>
                  <li>{song.Name}</li>
                </Link>
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }
}
ResultGrid.propTypes = {
  data : PropTypes.array.isRequired,
  module : PropTypes.string.isRequired,
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
          : <ResultGrid data={this.state.searchResults} 
                        module= {this.props.moduleType} />}

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