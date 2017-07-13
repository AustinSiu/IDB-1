var React = require('react');
var PropTypes = require('prop-types');
var api = require('../api');
var Link = require('react-router-dom').Link;
import { PageHeader, Pagination, Button,
     ButtonGroup, ButtonToolbar,
     Grid, Row, Col } from 'react-bootstrap';

var orderByAsc = [{'field': 'Name', 'direction': 'asc'}];
var orderByDsc = [{'field': 'Name', 'direction': 'desc'}];

function SelectLocation (props) {
  var filters = ["Show All", "United States and Canada", "Europe and Asia"];
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
SelectLocation.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function TourGrid(props) {
  return(
    <ul className="data-list">
      {props.tours.map(function (tour) {
        return (
          <li key={tour.TourID} className='data-item'>
            <ul className='data-list-items'>
                <Link to={'/tour-instance/' + tour.TourID}>
                  <li>
                    <img
                      className='img'
                      src={tour.Image}
                      alt={'Image for ' + tour.Name}/>
                  </li>
                  <li>{tour.Name}</li>
                </Link>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
TourGrid.propTypes = {
  tours : PropTypes.array.isRequired,
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
          : <TourGrid tours={this.state.tours} />}

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
    )
  }
}

module.exports = Tours;
