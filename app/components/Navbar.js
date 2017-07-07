
var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Nav () {
  return (
    <ul className='nav'>
      <li><NavLink exact activeClassName='active' to='/'>Home</NavLink></li>
      <li><NavLink activeClassName='active' to='/artists'>Artists</NavLink></li>
      <li><NavLink activeClassName='active' to='/albums'>Albums</NavLink></li>
      <li><NavLink activeClassName='active' to='/songs'>Songs</NavLink></li>
      <li><NavLink activeClassName='active' to='/tours'>Tours</NavLink></li>
      <li><NavLink activeClassName='active' to='/about'>About</NavLink></li>
    </ul>
  )
}

module.exports = Nav;