var React = require('react');
var api = require('../api.js');
var Search = require('./Search.js');
import { PageHeader, Pagination, Tabs, Tab } from 'react-bootstrap';

class SearchResults extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searchString: null,
    }
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.showSearchEntry = this.showSearchEntry.bind(this);
  }
  componentWillMount() {
    this.updateSearchResults((this.props.match.params.searchString).split(" "));
  }
  componentWillReceiveProps(nextProps){
    this.setState({searchString: (nextProps.match.params.searchString).split(" ")}, 
      function() {
        this.updateSearchResults(this.state.searchString);
      })
  }
  updateSearchResults(searchString) {
    this.setState({searchString: searchString});
  }
  showSearchEntry(){
    const { searchString } = this.state;
    var title = "";
    for(var i = 0; i < searchString.length; i++){
      title += searchString[i];
      if(i != searchString.length-1)
        title += " ";
    }
    return title;
  }
  render(){
    return(
      <div>
        <h1>Search results for: {this.showSearchEntry()}</h1>
        <Search searchString = {this.state.searchString} />
      </div>
    )
  }
}

module.exports = SearchResults;