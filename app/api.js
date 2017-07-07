
var axios = require('axios');

var artistsURL = 'http://banddb.me/api/genre';
var genres = ["Show All", "Alternative", "Blues", "Country", "Electronic", "Indie", "Rap", "Rock"];

module.exports = {

  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then(function (response) {
        return response.data.items;
      });
  },

  getArtists: function (filter) {

    var encodedURI = window.encodeURI('http://banddb.me/api/genre');
    console.log(JSON.stringify({"filters": filter}));
    return axios.get(encodedURI, {
      headers: {
        'Content-Type': 'application/json'
      } 
      }).then(function (response) {
        console.log("Response: ");
        console.log(response);
        return response.data.objects
      }).catch(function(error) {
        console.log("Recieved Error: ");
        console.log(error);      
      });
  }

};