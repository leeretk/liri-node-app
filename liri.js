
//*********************************************GLOBAL VARIABLES********************************/

require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");
var inquirer = require("inquirer");

//*********************************************SPOTIFY********************************/
//Set Variables
var Spotify = require('node-spotify-api');
console.log(keys.spotify)
var spotifyQry = new Spotify(keys.spotify);

//vars to capture input process.argv
var userQry = process.argv[2];
var qryParameter = process.argv.slice(3).join(" ")

//Execute function
UserQuery(userQry, qryParameter);

function UserQuery(userQry, qryParameter) {
  switch (userQry) {
    case 'concert-this':
      showConcertInfo(qryParameter);
      break;
    case 'song-this':
      showSpotifyInfo(qryParameter);
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
function showSpotifyInfo(qryParameter) {
  if (qryParameter === undefined) {
    qryParameter = "River"; //song default
  }
  spotifyQry.search(
    {
      type: "track",
      limit: 1,
      query: qryParameter
    },
    function (err, data) {
      if (err) {
        console.log("error" + err)
        return;
      }
      var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
          console.log("********************************************");
          console.log("SPOTIFY SONG INFORMATION");
          console.log("-----------------------------");
          console.log("Query Parameter: " + qryParameter)
          console.log("-----------------------------");
          console.log("Record Number: " + i);
          console.log("Song Name: " + data.tracks.items[i].name);
          console.log("Preview Song: " + songs[i].preview_url);
          console.log("Album: " + songs[i].album.name);
          console.log("Artist(s): " + songs[i].artists[0].name);
          console.log("********************************************");

          fs.appendFileSync("log.txt", "********************************************\n");
          fs.appendFileSync("log.txt", "SPOTIFY SONG INFORMATION\n");
          fs.appendFileSync("log.txt", "-----------------------------\n");
          fs.appendFileSync("log.txt", "Query Parameter: " + qryParameter + "\n")
          fs.appendFileSync("log.txt", "-----------------------------\n");
          fs.appendFileSync("log.txt", "Song Name: " + songs[i].name + "\n");
          fs.appendFileSync("log.txt", i + "\n");
          fs.appendFileSync("log.txt", "Preview Song: " + songs[i].preview_url + "\n");
          fs.appendFileSync("log.txt", "Album: " + songs[i].album.name + "\n");
          fs.appendFileSync("log.txt", "Artist(s): " + songs[i].artists[0].name + "\n");
          fs.appendFileSync("log.txt", "********************************************\n");
        }
    }
  );
};
//console.log(JSON.stringify(data,null,2));
//data.tracks.items[0]
//data.tracks.items[0].album.artists.name
//data.tracks.items[0].album.name
//data.tracks.items[0].preview_url
//data.tracks.items[0].name
//*********************************************END SPOTIFY********************************/

//Function Bands in Town
function showConcertInfo(inputParameter){
  var queryUrl = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";

  request(queryUrl, function(error, response, body) {
  // If the request is successful
  console.log(request);
  if (!error && response.statusCode === 200) {
      
    var concerts = JSON.parse(body);
    
    for (var i = 0; i < concerts.length; i++) {  
          console.log("**********EVENT INFO*********");  
          console.log(i);
          console.log("Name of the Venue: " + concerts[i].venue.name);
          console.log("Venue Location: " +  concerts[i].venue.city);
          console.log("Date of the Event: " +  concerts[i].datetime);
          console.log("*****************************");

          fs.appendFileSync("log.txt", "**********EVENT INFO*********\n");//Append in log.txt file
          fs.appendFileSync("log.txt", i+"\n");
          fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name+"\n");
          fs.appendFileSync("log.txt", "Venue Location: " +  concerts[i].venue.city+"\n");
          fs.appendFileSync("log.txt", "Date of the Event: " +  concerts[i].datetime+"\n");
          fs.appendFileSync("log.txt", "*****************************"+"\n");
      }
  } else{
    console.log('Error occurred.');
  }
});}



// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    {
      venue: "input",
      message: "What venue are you searching for?",
    },
    {
      venueLocation: "input",
      message: "What venue location are you searching for?",
    },
    {
      eventDate: "input",
      message: "What concert dates are you searching for?",
    }
]).then(function(inquirerResponse) 
{
    if (inquirerResponse.venue) {
      console.log("\nConcert Venue: " + inquirerResponse);
    }
    else {
      console.log("\nThat's okay " + inquirerResponse + ", come again when you are more sure.\n");
    }


  });