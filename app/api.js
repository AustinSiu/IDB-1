
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
        if (filter === "Show All") {
          return response.data.objects
        }
        else {
          return (response.data.objects.filter(function(artist)  {
            for (var genre of artist.ArtistGenre) {
              if (genre.Name === filter) {
                return true
              }}
            return false
          }))
        }
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
      },
      }).then(function (response) {
        if (filter === "Show All") {
          return response.data.objects
        }
        else {
          return (response.data.objects.filter(function(album)  {
            for (var genre of album.AlbumGenre) {
              if (genre.Name === filter) {
                return true
              }}
            return false
          }))
        }
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
        if (filter === "Show All") {
          return response.data.objects
        }
        else {
          return (response.data.objects.filter(function(song)  {
            for (var genre of song.SongGenre) {
              if (genre.Name === filter) {
                return true
              }}
            return false
          }))
        }
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
  },

  // Instance functions

  getAlbum: function(id) {

    var encodedURI = window.encodeURI(albumsURL+ '/' + id);
    console.log("the encoded URI" + encodedURI);
    return axios.get(encodedURI, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      console.log(response.data)
      return response.data
    }).catch(function (error) {
      console.log("Received Error: ");
      console.log(error);
    });

  },

  getArtist: function(id) {

    var encodedURI = window.encodeURI(artistsURL+ '/' + id);
    console.log("the encoded URI" + encodedURI);
    return axios.get(encodedURI, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      console.log(response.data)
      return response.data
    }).catch(function (error) {
      console.log("Received Error: ");
      console.log(error);
    });

  },

  getSong: function(id) {

    var encodedURI = window.encodeURI(songsURL+ '/' + id);
    console.log("the encoded URI" + encodedURI);
    return axios.get(encodedURI, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      console.log(response.data)
      return response.data
    }).catch(function (error) {
      console.log("Received Error: ");
      console.log(error);
    });

  }









};
