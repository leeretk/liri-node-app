
//*********************************************GLOBAL VARIABLES********************************/

require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");
var inquirer = require("inquirer");
var axios = require("axios");

//*********************************************SPOTIFY********************************/
//Set Variables
var Spotify = require('node-spotify-api');
console.log(keys.spotify)
var spotifyQry = new Spotify(keys.spotify);

//vars to capture input process.argv
var userQry = process.argv[2];
var qryParameter = process.argv.slice(3).join(" ")

// Run the test and log it to console immediately
console.log(process.argv[2] === process.argv[3]);
console.log(process.argv[2] % 7 === 0 && process.argv[3] % 7 === 0);

//Execute function
UserQuery(userQry, qryParameter);

function UserQuery(userQry, qryParameter) {
  switch (userQry) {
    case 'concert-this':
      showConcertInfo(qryParameter);
      break;
    case 'spotify-this-song':
      showSpotifyInfo(qryParameter);
      break;
    case 'movie-this':
      showMovieInfo(qryParameter);
      break;
    case 'do-what-it-says':
      whatThisInfo(qryParameter);
      break;
    default:
      console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
  }
};
//Spotify
function showSpotifyInfo(qryParameter) {
  if (qryParameter === undefined) {
    qryParameter = "Whiskey River"; //song default
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
//*********************************************END SPOTIFY********************************/

//*********************************************BANDS IN TOWN********************************/
//Bands in Town Function
function showConcertInfo(qryParameter) {
  var queryUrl = "https://rest.bandsintown.com/artists/" + qryParameter + "/events?app_id=codingbootcamp";

  request(queryUrl, function (error, response, body) {
    console.log(request);
    if (!error && response.statusCode === 200) {


      var concerts = JSON.parse(body);

      // console.log(response);

      for (var i = 0; i < concerts.length; i++) {
        console.log("**********EVENT INFO*********");
        console.log(i);
        console.log("Name of the Venue: " + concerts[i].venue.name);
        console.log("Venue Location: " + concerts[i].venue.city);
        console.log("Date of the Event: " + concerts[i].datetime);
        console.log("*****************************");

        fs.appendFileSync("log.txt", "**********EVENT INFO*********\n");//Append in log.txt file
        fs.appendFileSync("log.txt", i + "\n");
        fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name + "\n");
        fs.appendFileSync("log.txt", "Venue Location: " + concerts[i].venue.city + "\n");
        fs.appendFileSync("log.txt", "Date of the Event: " + concerts[i].datetime + "\n");
        fs.appendFileSync("log.txt", "*****************************" + "\n");
      }
    } else {
      console.log('Error occurred.');
    }
  });
};
//*********************************************END BANDS IN TOWN********************************/

//*********************************************OMDB MOVIES********************************/
//Function for Movie Info: OMDB
function showMovieInfo(qryParameter) {

  var queryUrl = "http://www.omdbapi.com/?t=" + qryParameter + "&y=&plot=short&apikey=b3c0b435";

  if (qryParameter === undefined) {
    qryParameter = "Mr. Nobody" //default movie
    console.log("-----------------------");
    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");
    fs.appendFileSync("log.txt", "-----------------------\n");
    fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\n");
    fs.appendFileSync("log.txt", "It's on Netflix!\n");
  }

  axios.get(queryUrl).then(
    function (response) {
      request(queryUrl, body, error);
      var movies = JSON.parse(body);

      console.log("**********MOVIE INFO*********");
      console.log("Title: " + movies.Title);
      console.log("Release Year: " + movies.Year);
      console.log("IMDB Rating: " + movies.imdbRating);
      console.log("Country of Production: " + movies.Country);
      console.log("Language: " + movies.Language);
      console.log("Plot: " + movies.Plot);
      console.log("Actors: " + movies.Actors);
      console.log("*****************************");
      console.log("The movie's rating is: " + response.data.imdbRating);
      fs.appendFileSync("log.txt", "**********MOVIE INFO*********\n");
      fs.appendFileSync("log.txt", "Title: " + movies.Title + "\n");
      fs.appendFileSync("log.txt", "Release Year: " + movies.Year + "\n");
      fs.appendFileSync("log.txt", "IMDB Rating: " + movies.imdbRating + "\n");
      fs.appendFileSync("log.txt", "*****************************\n");
      fs.appendFileSync("log.txt", "Actors: " + movies.Actors + "\n");
      fs.appendFileSync("log.txt", "Language: " + movies.Language + "\n");
      fs.appendFileSync("log.txt", "Plot: " + movies.Plot + "\n");
      fs.appendFileSync("log.txt", "Country of Production: " + movies.Country + "\n");
    })
    .catch(function (error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
    );}



//function for reading out of random.txt file  
// function showSomeInfo(){
// fs.readFile('random.txt', 'utf8', function(err, data){
//   if (err){ 
//     return console.log(err);
//   }
//       var dataArr = data.split(',');
//       UserInputs(dataArr[0], dataArr[1]);
// });
// }

// // Create a "Prompt" with a series of questions.
// inquirer
//   .prompt([
//     {
//       venue: "input",
//       message: "What venue are you searching for?",
//     },
//     {
//       venueLocation: "input",
//       message: "What venue location are you searching for?",
//     },
//     {
//       eventDate: "input",
//       message: "What concert dates are you searching for?",
//     }
// ]).then(function(inquirerResponse) 
// {
//     if (inquirerResponse.venue) {
//       console.log("\nConcert Venue: " + inquirerResponse);
//     }
//     else {
//       console.log("\nThat's okay " + inquirerResponse + ", come again when you are more sure.\n");
//     }

//   });





//console.log(JSON.stringify(data,null,2));
//data.tracks.items[0]
//data.tracks.items[0].album.artists.name
//data.tracks.items[0].album.name
//data.tracks.items[0].preview_url
//data.tracks.items[0].name