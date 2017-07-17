var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function Grid(props) {
  const { data, module } = props;
  if (!props.data[0]) {
    return (<h2 className="subtitle">No results found</h2>)
  }
  return(
    <ul className="data-list">
      {props.data.map(function (instance) {
        var id =  (instance.SongID)   ? instance.SongID
                : (instance.AlbumID)  ? instance.AlbumID
                : (instance.TourID)   ? instance.TourID
                : (instance.ArtistID) ? instance.ArtistID  
                : null;
        var name = (instance.Name) ? instance.Name : instance.Title;
        if (id && name) {
          return (
            <li key={id} className='data-item'>
              <ul className='data-list-items'>
                <Link to={'/' + module + '/' + id}>
                  <li>
                    <img
                      className='img'
                      src={instance.Image}
                      alt={'Image for ' + name}/>
                  </li>
                  <li>{name}</li>
                </Link>
              </ul>
            </li>
          )
        }
      })}
    </ul>
  )
}
Grid.propTypes = {
  data : PropTypes.array.isRequired,
  module : PropTypes.string.isRequired,
};

module.exports = Grid;
