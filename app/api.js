
var axios = require('axios');

var artistsURL = 'http://banddb.me/api/artists';
var songsURL = 'http://banddb.me/api/songs';
var albumsURL = 'http://banddb.me/api/albums';
var toursURL = 'http://banddb.me/api/tours';

module.exports = {

  getArtists: function (filter) {

    var encodedURI = window.encodeURI(artistsURL);
    console.log(JSON.stringify({"filters": filter}));
    return axios.get(encodedURI, {
      headers: {
        'Content-Type': 'application/json'
      } 
      }).then(function (response) {
        return response.data.objects
      }).catch(function(error) {
        console.log("Recieved Error: ");
        console.log(error);      
      });
  },

  getAlbums: function (filter) {

    var encodedURI = window.encodeURI(albumsURL);
    console.log(JSON.stringify({"filters": filter}));
    return axios.get(encodedURI, {
      headers: {
        'Content-Type': 'application/json'
      } 
      }).then(function (response) {
        return response.data.objects
      }).catch(function(error) {
        console.log("Recieved Error: ");
        console.log(error);      
      });
  },

  getSongs: function (filter) {

    var encodedURI = window.encodeURI(songsURL);
    console.log(JSON.stringify({"filters": filter}));
    return axios.get(encodedURI, {
      headers: {
        'Content-Type': 'application/json'
      } 
      }).then(function (response) {
        return response.data.objects
      }).catch(function(error) {
        console.log("Recieved Error: ");
        console.log(error);      
      });
  },

  getTours: function (filter) {

    var encodedURI = window.encodeURI(toursURL);
    console.log(JSON.stringify({"filters": filter}));
    return axios.get(encodedURI, {
      headers: {
        'Content-Type': 'application/json'
      } 
      }).then(function (response) {
        return response.data.objects
      }).catch(function(error) {
        console.log("Recieved Error: ");
        console.log(error);      
      });
  }

};