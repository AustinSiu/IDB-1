var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;


function ContextSearch(props) {
  const { searchString } = props;
  var context = [];
  for(var i = 0; i < searchString.length; i++) {
    var re = new RegExp(searchString[i], 'i');
    JSON.parse(JSON.stringify(props.data), (key, value) => {
        if(re.test(value)) {
          var idx = value.toString().search(re);
          context.push (
            <li key={context.length} className='context' >
              {key + " : "}
              {value.slice(0, idx)}
              <mark> 
                {value.toString().slice(idx, idx + searchString[i].length)}
              </mark>
              {value.slice(idx + searchString[i].length, value.length)}
            </li>
          );
        }
        return key;
      })
  }
  return (
    <div>
      {context}
    </div>
  )
}
SearchResultsGrid.propTypes = {
  data : PropTypes.array.isRequired,
  searchString : PropTypes.array.isRequired,  
};

function SearchResultsGrid(props) {
  const { data, module, searchString } = props;
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
                <br/>
                <ContextSearch  data = {instance}
                                searchString = {searchString} />
              </Link>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
SearchResultsGrid.propTypes = {
  data : PropTypes.array.isRequired,
  module : PropTypes.string.isRequired,
  searchString : PropTypes.array.isRequired,  
};

module.exports = SearchResultsGrid;
