var React = require('react');

class About extends React.Component {
  render() {
    return (
      <div className="about">
              <div className="container">
                <h2 className="title">Motivation</h2>
                <p className="subdesc">Our team was motivated to create an IMDb-like application for everything you need to know about artists and music. We were inspired by Spotify and came into realization that there needs to be a main place where people can find simple and quick information about an artist’s biography, discography, and tour dates. Our website is named “BandDB”, which stands for Band Database. We believe this website will be useful for music lovers and others alike who want to learn a little bit more about their favorite bands and artists.</p>
                <h3 className="subtitle">Group Name: Wiggity Wack</h3>
                <h3 className="subtitle">Group Members: </h3>
                  // insert images
              </div>
        </div>
    )
  }
}

module.exports = About;
