var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api');
var Link = require('react-router-dom').Link;
var Grid = require('./Grid.js')
import {Pagination} from 'react-bootstrap';

var orderByAsc = [{'field': 'Title', 'direction': 'asc'}];
var orderByDsc = [{'field': 'Title', 'direction': 'desc'}];

function SelectFilter (props) {
  var filters = ["Show All", "Top 10", "Top 20", "Top 40"];
  return (
    <ul className="my-button">
      <p className='title'>Filter By: </p>
      {filters.map((filter) => {
        return (
          <li
          style={filter === props.currentFilter ? {color: '#fd5927'} : null}
          onClick={props.onSelect.bind(null, filter)}
          key={filter}>
            {filter}
          </li>
        )
      })}
    </ul>
  )
}
SelectFilter.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function SelectSort (props) {
  var sorts = ["Ascending", "Descending"];
  return (
    <ul className="my-button">
      <p className='title'>Sort By: </p>
      {sorts.map((sort) => {
        return (
          <li
          style={sort === props.currentSort? {color: '#fd5927'} : null}
          onClick={props.onSelect.bind(null, sort)}
          key={sort}>
            {sort}
          </li>
        )
      })}
    </ul>
  )
}
SelectSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

class Albums extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: "Show All",
      currentSort: "Ascending",
      albums: null,
      activePage: 1,
      numPages: 1,
    };

    this.updateFilter = this.updateFilter.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    this.updateFilter(this.state.currentFilter)
  }
  updateFilter(peak_pos) {
    this.setState(function() {
      return {
        currentFilter: peak_pos,
        albums: null,
        activePage: 1,
      }
    });
    var filter;
    if (peak_pos === "Top 10") {
      filter = [{'name': 'US_Chart_Postion','op': '<=', 'val': 10}];
    } else if (peak_pos === "Top 20") {
      filter = [{'name': 'US_Chart_Postion','op': '<=', 'val': 20}];
    } else if (peak_pos === "Top 40") {
      filter = [{'name': 'US_Chart_Postion','op': '<=', 'val': 40}];
    }
    var order_by;
    if (this.state.currentSort === 'Ascending') {
      order_by = orderByAsc;
    } else {
      order_by = orderByDsc
    }
    api.getAlbums(1, filter, order_by)
      .then(function(data) {
        this.setState(function() {
          return {
            albums: data.objects,
            numPages: data.total_pages,
          }
        })
      }.bind(this))
  }
  updateSort(sort) {
    this.setState(function() {
      return {
        currentSort: sort,
        activePage: 1,
    }})
    var filter;
    if (this.state.currentFilter === "Top 10") {
      filter = [{'name': 'US_Chart_Postion','op': '<=', 'val': 10}];
    } else if (this.state.currentFilter === "Top 20") {
      filter = [{'name': 'US_Chart_Postion','op': '<=', 'val': 20}];
    } else if (this.state.currentFilter === "Top 40") {
      filter = [{'name': 'US_Chart_Postion','op': '<=', 'val': 40}];
    }
    var order_by;
    if (sort === 'Ascending') {
      order_by = orderByAsc;
    } else {
      order_by = orderByDsc
    }
    api.getAlbums(1, filter, order_by)
      .then(function(data) {
        this.setState(function() {
          return {
            albums: data.objects,
            numPages: data.total_pages,
          }
        })
      }.bind(this))
  }
  handleSelect(eventKey) {
    this.setState({activePage: eventKey});

    var filter;
    if (this.state.currentFilter === "Top 10") {
      filter = [{'name': 'US_Chart_Postion','op': '<=', 'val': 10}];
    } else if (this.state.currentFilter === "Top 20") {
      filter = [{'name': 'US_Chart_Postion','op': '<=', 'val': 20}];
    } else if (this.state.currentFilter === "Top 40") {
      filter = [{'name': 'US_Chart_Postion','op': '<=', 'val': 40}];
    }
    var order_by;
    if (this.state.currentSort === 'Ascending') {
      order_by = orderByAsc;
    } else {
      order_by = orderByDsc
    }
    api.getAlbums(eventKey, filter, order_by)
      .then(function(data) {
        this.setState(function() {
          return {
            albums: data.objects,
            numPages: data.total_pages,
          }
        })
      }.bind(this))
  }

  render() {
    const { album } = this.state;
    return (
      <div className='center-pagination'>
        <SelectFilter
        currentFilter = {this.state.currentFilter}
        onSelect = {this.updateFilter}/>
        <SelectSort
        currentSort={this.state.currentSort}
        onSelect= {this.updateSort}/>

        {!this.state.albums
          ? <p>LOADING</p>
          : <Grid data={this.state.albums} 
                  module={"Albums"}/>}

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
    )
  }
}

module.exports = Albums;
