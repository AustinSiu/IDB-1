var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <div className="title-header">
              <div className="container">
                <h2 className="title">Welcome to BandDB</h2>
                <h3 className="subtitle">Everything you need to know about your favorite bands and artists</h3>
                <p className="subdesc">Start by browsing artists, albums, tours, and songs. The options are endless.</p>

              </div>
        </div>
  )
  }
}

module.exports = Home;
