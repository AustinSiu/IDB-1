var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api.js');
var Search = require('./Search.js');
import {Pagination, Tabs, Tab, TabContainer} from 'react-bootstrap';

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
  displayResults(moduleType) {
    if (this.state.searchString.length > 1) {
      return (
        <div>
          <h3>AND search results: </h3>
          <Search searchString = {this.state.searchString}
                  moduleType = {moduleType} 
                  searchType = {"and"} />
          <h3>OR search results: </h3>
          <Search searchString = {this.state.searchString}
                  moduleType = {moduleType} 
                  searchType = {"or"} />
        </div>
      )
    }
    else {
      return (
        <Search searchString = {this.state.searchString}
                moduleType = {moduleType} 
                searchType = {"or"} />
      )
    }
  }
  render(){
    return(
      <div>
        <SearchPageTitle searchString = {this.state.searchString} />
        <TabContainer id={5}>
          <Tabs animation bsStyle="pills" onSelect={this.handleTabSelect} id={6}>
            <Tab unmountOnExit={true} eventKey={1} title="Artists">
              {this.displayResults("Artists")}
            </Tab>
            <Tab unmountOnExit={true} eventKey={2} title="Albums">
              {this.displayResults("Albums")}
            </Tab>
            <Tab unmountOnExit={true} eventKey={3} title="Songs">
              {this.displayResults("Songs")}
            </Tab>  
            <Tab unmountOnExit={true} eventKey={4} title="Tours">
              {this.displayResults("Tours")}
            </Tab>    
          </Tabs>
        </TabContainer>
      </div>
    )
  }
}

module.exports = SearchResults;