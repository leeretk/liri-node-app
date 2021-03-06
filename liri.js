
//*********************************************GLOBAL VARIABLES**************************/

require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment")

// const emitter = new EventEmitter()
// require('events').EventEmitter.prototype._maxListeners = 100;


//*********************************************SPOTIFY********************************/
//Set Variables
var Spotify = require('node-spotify-api');

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
  }
};
//Spotify
function showSpotifyInfo(qryParameter) {
  if (qryParameter === "") {
    qryParameter = "The Sign"; //song default
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
        prompt();
      }
    }
  );
};
//*********************************************END SPOTIFY********************************/

//*********************************************BANDS IN TOWN******************************/
//Bands in Town Function with Axios
function showConcertInfo(qryParameter) {

  var queryUrl = "https://rest.bandsintown.com/artists/" + qryParameter + "/events?app_id=codingbootcamp"

  axios.get(queryUrl).then(
    function (response) {
      if (response.data.length) {
        for (var i = 0; i < response.data.length; i++) {
          console.log("**********EVENT INFO*********");
          console.log("Name of the Venue: " + response.data[i].venue.name);
          console.log("Venue Location: " + response.data[i].venue.city);
          console.log("Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
          console.log("*****************************");
          fs.appendFileSync("log.txt", "**********EVENT INFO*********\n");//Append in log.txt file
          fs.appendFileSync("log.txt", i + "\n");
          fs.appendFileSync("log.txt", "Name of the Venue: " + response.data[i].venue.name + "\n");
          fs.appendFileSync("log.txt", "Venue Location: " + response.data[i].venue.city + "\n");
          fs.appendFileSync("log.txt", "Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n");
          fs.appendFileSync("log.txt", "*****************************" + "\n");
        }
      } else {
        console.log('Error occurred.');
      }
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
    prompt();
 };
//*********************************************END BANDS IN TOWN**************************/

//*********************************************OMDB MOVIES********************************/
//SMovies with Axios
function showMovieInfo(qryParameter) {

  console.log(qryParameter)

  if (qryParameter === "") {
    qryParameter = "Mr. Nobody" //default movie
    console.log("-----------------------");
    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");
    fs.appendFileSync("log.txt", "-----------------------\n");
    fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\n");
    fs.appendFileSync("log.txt", "It's on Netflix!\n");
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + qryParameter + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(

    function (response) {
      console.log("**********MOVIE INFO*********");
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("The movie's rating is: " + response.data.imdbRating);
      console.log("Country of Production: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Actors: " + response.data.Actors);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Plot: " + response.data.Plot);
      console.log("*****************************");

      fs.appendFileSync("log.txt", "**********MOVIE INFO*********\n");
      fs.appendFileSync("log.txt", "Title: " + response.data.Title + "\n");
      fs.appendFileSync("log.txt", "Release Year: " + response.data.Year + "\n");
      fs.appendFileSync("log.txt", "This Movie's rating is: " + response.data.imdbRating + "\n");
      fs.appendFileSync("log.txt", "Country of Production: " + response.data.Country + "\n");
      fs.appendFileSync("log.txt", "Actors: " + response.data.Actors + "\n");
      fs.appendFileSync("log.txt", "Language: " + response.data.Language + "\n");
      fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n");
      fs.appendFileSync("log.txt", "Plot: " + response.data.Plot + "\n");
      fs.appendFileSync("log.txt", "*****************************\n");
      prompt();
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
    );
}

//*****************************************END OMDB MOVIES********************************/

//*****************************************CREATE PROMPTS ********************************/
//Create a "Prompt" with a series of questions.
function prompt() {

  inquirer.prompt([
    {
      type: "list",
      name: "queryChoices",
      message: "What would you like to search on?",
      choices: [
        "spotify-this-song",
        "movie-this",
        "concert-this",
        "do-what-it-says",
        "exit",
      ]
    }
  ]).then(function (inquirerResponse) {
    if (inquirerResponse.queryChoices === "spotify-this-song") {
      console.log("\nChoice: " + inquirerResponse.queryChoices);

      inquirer.prompt([
        {
          type: "input",
          name: "songThis",
          message: "What song would like to hear?"
        }
      ]).then(function (songResponse) {
        console.log("\nSong Response: " + songResponse.songThis);
        showSpotifyInfo(songResponse.songThis);
      })
    } else if (inquirerResponse.queryChoices === "movie-this") {
      console.log("\nChoice: " + inquirerResponse.queryChoices);

      inquirer.prompt([
        {
          type: "input",
          name: "movieThis",
          message: "What move would like to see?"
        }
      ]).then(function (movieResponse) {
        console.log("\nMovie Response: " + movieResponse.movieThis);
        showMovieInfo(movieResponse.movieThis);
      })
    } else if (inquirerResponse.queryChoices === "concert-this") {
      console.log("\nChoice: " + inquirerResponse.queryChoices);

      inquirer.prompt([
        {
          type: "input",
          name: "concertThis",
          message: "What artist or band would like to see?"
        }
      ]).then(function (concertResponse) {
        console.log("\nConcert Response: " + concertResponse.concertThis);
        showConcertInfo(concertResponse.concertThis);
      })
    } else if (inquirerResponse.queryChoices === "do-what-it-says") {

      inquirer.prompt([
        {
          type: "input",
          name: "whatItSaysThis",
          message: "Do Whay It Says?"
        }
      ]).then(function (anyResponse) {
        console.log("\nConcert Response: " + anyResponse.whatItSaysThis);
        showSomeInfo();
      })
    } else {
      console.log("all set")
      process.exit();
    }
  }
  );
}
prompt();
//*****************************************END  PROMPTS ********************************/

//function for reading out of random.txt file  
function showSomeInfo() {
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var dataArr = data.split(',');
    UserQuery(dataArr[0], dataArr[1]);
  });
  prompt();
}
