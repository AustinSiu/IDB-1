var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api.js');
var Search = require('./Search.js');
import {PageHeader, Pagination, Tabs, Tab} from 'react-bootstrap';

function SearchPageTitle(props) {
  var title = "Search results for: '";
  for(var i = 0; i < props.searchString.length; i++){
    title += props.searchString[i];
    if(i != props.searchString.length-1)
      title += " ";
  }
  title += "'"
  return (
    <h1>{title}</h1>
  )
}
SearchPageTitle.propTypes = {
  searchString : PropTypes.array.isRequired,
};

class SearchResults extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searchString: null,
    }
    this.updateSearchString = this.updateSearchString.bind(this);
  }
  componentWillMount() {
    this.updateSearchString((this.props.match.params.searchString).split(" "));
  }
  componentWillReceiveProps(nextProps){
    this.setState({searchString: (nextProps.match.params.searchString).split(" ")}, 
      function() {
        this.updateSearchString(this.state.searchString);
      })
  }
  updateSearchString(searchString) {
    this.setState({searchString: searchString});
  }
  render(){
    return(
      <div>
        <SearchPageTitle searchString = {this.state.searchString} />
        <Search searchString = {this.state.searchString}
                moduleType = {"Artists"} />
        <Search searchString = {this.state.searchString}
                moduleType = {"Albums"} />
        <Search searchString = {this.state.searchString}
                moduleType = {"Songs"} />
      </div>
    )
  }
}

module.exports = SearchResults;