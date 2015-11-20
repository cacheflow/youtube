require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');


var youtube = {

  get(search){
    search.match(/\s/g) ? search.replace(/\s/g, '+') : search;
    var url = `https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&maxResults=20&type=video&videoEmbeddable=true&q=${search}&key=${process.env.YOUTUBE_API_KEY}`
    return fetch(url).then((response) => response.json());
  }
};

module.exports = youtube;
