var React = require('react');

class Albums extends React.Component {
  
  constructor(props) {
    super();
    this.state = {};
  };

  // Don't forget to bind after adding methods
  //this.method = this.method.bind(this);

  render() {
    return (
      <div>Albums Page!</div>
    )
  }
}

module.exports = Albums;