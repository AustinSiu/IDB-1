var React = require('react');
var Link = require('react-router-dom').Link;
import { FormGroup, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router';

class SearchBox extends React.Component {
  constructor(props){
    super();
    this.state = {
      search_entry: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChange(event) {
      this.setState({search_entry: event.target.value});
      console.log(event.target.value)
    }

    handleSubmit(event){
      event.preventDefault();
      var searchEndPoint = this.state.search_entry
      this.props.history.push("/search/" + searchEndPoint);
      this.setState({ search_entry: ''});
    }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup >
                <FormControl  type="text" 
                              value={this.state.search_entry} 
                              placeholder="Search..."
                              onChange={this.handleChange} />

                <FormControl.Feedback />
              </FormGroup>
           </form>
        </div>
    )
  }
}

module.exports = withRouter(SearchBox);