
var axios = require('axios');

var artistsURL = 'http://banddb.me/api/artists';
var songsURL = 'http://banddb.me/api/songs';
var albumsURL = 'http://banddb.me/api/albums';
var toursURL = 'http://banddb.me/api/tours';

module.exports = {

  getArtists: function (page, filter, orderBy) {

    var encodedURI = window.encodeURI(artistsURL);
    return axios.get(encodedURI, {

      headers: {
          'Content-Type': 'application/json'
      },

      params: {
          'page': page,
          'q': JSON.stringify({"order_by": orderBy, 'filters': filter})
      }
    })
    .then(function(response) {
        console.log(response);

        return response.data;
    }).catch(function(error) {
        console.log(error);
    });
  }, 

  getAlbums: function (page, filter, orderBy) {

    var encodedURI = window.encodeURI(artistsURL);
    return axios.get(encodedURI, {

      headers: {
          'Content-Type': 'application/json'
      },

      params: {
          'page': page,
          'q': JSON.stringify({"order_by": orderBy, 'filters': filter})
      }
    })
    .then(function(response) {
        console.log(response);

        return response.data;
    }).catch(function(error) {
        console.log(error);
    });
  }, 

  getSongs: function (page, filter, orderBy) {

    var encodedURI = window.encodeURI(artistsURL);
    return axios.get(encodedURI, {

      headers: {
          'Content-Type': 'application/json'
      },

      params: {
          'page': page,
          'q': JSON.stringify({"order_by": orderBy, 'filters': filter})
      }
    })
    .then(function(response) {
        console.log(response);

        return response.data;
    }).catch(function(error) {
        console.log(error);
    });
  }, 

  getTours: function (page, filter, orderBy) {

    var encodedURI = window.encodeURI(artistsURL);
    return axios.get(encodedURI, {

      headers: {
          'Content-Type': 'application/json'
      },

      params: {
          'page': page,
          'q': JSON.stringify({"order_by": orderBy, 'filters': filter})
      }
    })
    .then(function(response) {
        console.log(response);

        return response.data;
    }).catch(function(error) {
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

  },

  // utils







};
