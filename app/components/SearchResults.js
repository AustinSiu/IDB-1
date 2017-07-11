var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api.js');
var Search = require('./Search.js');
import { PageHeader, Pagination, Tabs, Tab } from 'react-bootstrap';

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
        
        <Tabs animation bsStyle="pills" onSelect={this.handleTabSelect}>
          <Tab unmountOnExit={true} eventKey={1} title="Artists">
            <br/>
            <Search searchString = {this.state.searchString}
                    moduleType = {"Artists"} />
          </Tab>
          <Tab unmountOnExit={true} eventKey={2} title="Albums">
            <br/>
            <Search searchString = {this.state.searchString}
                    moduleType = {"Albums"} />
          </Tab>
          <Tab unmountOnExit={true} eventKey={3} title="Songs">
            <br/>
            <Search searchString = {this.state.searchString}
                    moduleType = {"Songs"} />
          </Tab>  
          <Tab unmountOnExit={true} eventKey={4} title="Tours">
            <br/>
            <Search searchString = {this.state.searchString}
                    moduleType = {"Tours"} />
          </Tab>    
        </Tabs>
      </div>
    )
  }
}

module.exports = SearchResults;