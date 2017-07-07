var React = require('react');
var PropTypes = require('prop-types');


function Grid(props) {
  return(
    <ul className="data-list">
      {props.artists.map(function (artist) {
        return (
          <li key={artist.ArtistID} className='data-item'>
            <ul className='data-list-items'>
              <li>
                <img
                  className='img'
                  src={artist.Image}
                  alt={'Image for ' + artist.Name}/>
              </li>
              <li>{artist.Name}</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

Grid.propTypes = {
  artists : PropTypes.array.isRequired,
};

module.exports = Grid;
