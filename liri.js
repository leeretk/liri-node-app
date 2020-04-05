
//https://www.npmjs.com/package/spotify-web-api-node//
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");

console.log(document.body.module);

//Set Variables
var request = require("request");

var Spotify = require('spotify-web-api-node');
var spotifyQry = new Spotify(keys.spotify);


//vars to capture input process.argv
var userQry = process.argv[2]; 
var qryParameter = process.argv[3];

//Execute function
SpotifyQry(userQry, qryParameter);

function SpotifyQry (userQry, qryParameter) {
  switch (userQry) {
    case 'concert-this':
      concertThisInfo(qryParameter);
      break;
    case 'song-this':
      songThisInfo(qryParameter);
      break;
    case 'movie-this':
      movieThisInfo(qryParameter);
      break;
    case 'do-what-it-says':
      whatThisInfo(); 
      break;
    default: 
      console.log("Invalid Option. Please type any of the following options: \nconcert-this \nsong-this \nmovie-this \ndo-what-it-says")
}
}

//function for Spotify

function showSpotify(qryParameter) {
  if (qryParameter===undefined) {
    qryParameter="River"; //song default
  }
  spotifyQry.search( 
    {
      type: "track",
      query: qryParameter
    }, 
    function (err, data) {
      if(err) {
        console.log("error" + err)
        return;
      }
      var songs = data.tracks.items;

      for (var i=0; i < songs.length; i++) {
          console.log("SONG INFORMATION");
          fs.appendFileFileSync("log.text", "Song Info\n");
          console.log(i);
      }
    }
  )
}