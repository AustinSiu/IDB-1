var React = require('react');
var Artists = require('./Artists');
var Albums = require('./Albums');
var Tours = require('./Tours');
var Songs = require('./Songs');


class App extends React.Component {
  render() {
    return (
      <div className='container'>
      	<Artists />
      </div>
    )
  }
}

module.exports = App;