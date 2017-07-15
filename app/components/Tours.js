var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api');
var Link = require('react-router-dom').Link;
var Grid = require('./Grid.js')
import {Pagination} from 'react-bootstrap';

var orderByAsc = [{'field': 'Name', 'direction': 'asc'}];
var orderByDsc = [{'field': 'Name', 'direction': 'desc'}];

function SelectLocation (props) {
  var filters = ["Show All", "North America", "South America", "Europe", "Asia", "Oceania"];
  return (
    <ul className="my-button">
      <p className='title'>Filter By: </p>
      {filters.map((filter) => {
        return (
          <li
          style={filter === props.currentFilter ? {border: '1px solid #fd5927', color:'#fd5927'} : null}
          onClick={props.onSelect.bind(null, filter)}
          key={filter}>
            {filter}
          </li>
        )
      })}
    </ul>
  )
}
SelectLocation.propTypes = {
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
          style={sort === props.currentSort? {border: '1px solid #fd5927', color:'#fd5927'} : null}
          onClick={props.onSelect.bind(null, sort)}
          key={sort}>
            {sort}
          </li>
        )
      })}
    </ul>
  )
}
SelectLocation.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

class Tours extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: "Show All",
      currentSort: "Ascending",
      tours: null,
      activePage: 1,
      numPages: 0,
    };

    this.updateFilter = this.updateFilter.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    this.updateFilter(this.state.currentFilter)
  }
  updateFilter(location) {
    this.setState(function() {
      return {
        currentFilter: location,
        tours: null,
        activePage: 1,
      }
    });
    var filter;
    if (location === "North America") {
      filter = [{"or": [
                  {'name': 'Locations','op': 'like', 'val': '%North America%'},
                  {'name': 'Locations','op': 'like', 'val': '%Canada%'},
                  {'name': 'Locations','op': 'like', 'val': '%United States%'},
                ]}]
    } else if (location === "South America") {
      filter = [{"or": [
                  {'name': 'Locations','op': 'like', 'val': '%South America%'},
                  {'name': 'Locations','op': 'like', 'val': '%Latin America%'},
                ]}]
    } else if (location === "Europe") {
      filter = [{'name': 'Locations', 'op': 'like', 'val': '%Europe%'}]
    } else if (location === "Asia") {
      filter = [{'name': 'Locations', 'op': 'like', 'val': '%Asia%'}]
    } else if (location === "Oceania") {
      filter = [{"or": [
                  {'name': 'Locations','op': 'like', 'val': '%Oceania%'},
                  {'name': 'Locations','op': 'like', 'val': '%Australia%'},
                ]}]
    }
    var order_by;
    if (this.state.currentSort === 'Ascending') {
      order_by = orderByAsc;
    } else {
      order_by = orderByDsc
    }
    api.getTours(1, filter, order_by)
      .then(function(data) {
        this.setState(function() {
          return {
            tours: data.objects,
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
    if (this.state.currentFilter === "North America") {
      filter = [{"or": [
                  {'name': 'Locations','op': 'like', 'val': '%North America%'},
                  {'name': 'Locations','op': 'like', 'val': '%Canada%'},
                  {'name': 'Locations','op': 'like', 'val': '%United States%'},
                ]}]
    } else if (this.state.currentFilter  === "South America") {
      filter = [{"or": [
                  {'name': 'Locations','op': 'like', 'val': '%South America%'},
                  {'name': 'Locations','op': 'like', 'val': '%Latin America%'},
                ]}]
    } else if (this.state.currentFilter  === "Europe") {
      filter = [{'name': 'Locations', 'op': 'like', 'val': '%Europe%'}]
    } else if (this.state.currentFilter  === "Asia") {
      filter = [{'name': 'Locations', 'op': 'like', 'val': '%Asia%'}]
    } else if (this.state.currentFilter  === "Oceania") {
      filter = [{"or": [
                  {'name': 'Locations','op': 'like', 'val': '%Oceania%'},
                  {'name': 'Locations','op': 'like', 'val': '%Australia%'},
                ]}]
    }
    var order_by;
    if (sort === 'Ascending') {
      order_by = orderByAsc;
    } else {
      order_by = orderByDsc
    }
    api.getTours(1, filter, order_by)
      .then(function(data) {
        this.setState(function() {
          return {
            tours: data.objects,
            numPages: data.total_pages,
          }
        })
      }.bind(this))
  }
  handleSelect(eventKey) {
    this.setState({activePage: eventKey});

    var filter;
    if (this.state.currentFilter  === "North America") {
      filter = [{"or": [
                  {'name': 'Locations','op': 'like', 'val': '%North America%'},
                  {'name': 'Locations','op': 'like', 'val': '%Canada%'},
                  {'name': 'Locations','op': 'like', 'val': '%United States%'},
                ]}]
    } else if (this.state.currentFilter  === "South America") {
      filter = [{"or": [
                  {'name': 'Locations','op': 'like', 'val': '%South America%'},
                  {'name': 'Locations','op': 'like', 'val': '%Latin America%'},
                ]}]
    } else if (this.state.currentFilter  === "Europe") {
      filter = [{'name': 'Locations', 'op': 'like', 'val': '%Europe%'}]
    } else if (this.state.currentFilter  === "Asia") {
      filter = [{'name': 'Locations', 'op': 'like', 'val': '%Asia%'}]
    } else if (this.state.currentFilter  === "Oceania") {
      filter = [{"or": [
                  {'name': 'Locations','op': 'like', 'val': '%Oceania%'},
                  {'name': 'Locations','op': 'like', 'val': '%Australia%'},
                ]}]
    }
    var order_by;
    if (this.state.currentSort === 'Ascending') {
      order_by = orderByAsc;
    } else {
      order_by = orderByDsc
    }
    api.getTours(eventKey, filter, order_by)
      .then(function(data) {
        this.setState(function() {
          return {
            tours: data.objects,
            numPages: data.total_pages,
          }
        })
      }.bind(this))
  }

  render() {
    const { tour } = this.state;
    return (
      <div className='center-pagination'>
        <SelectLocation
        currentFilter = {this.state.currentFilter}
        onSelect = {this.updateFilter}/>
        <SelectSort
        currentSort={this.state.currentSort}
        onSelect= {this.updateSort}/>

        {!this.state.tours
          ? <p>LOADING</p>
          : <Grid data={this.state.tours}
                  module={"tours"} />}

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

module.exports = Tours;
