# LIRI Bot

### Overview

LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

### What can Liri find for you?

1. Clearly state the problem the app is trying to solve (i.e. what is it doing and why)


1. Songs using Spotify
2. Upcoming Concerts with Bands in Town
3. Movie Information with OMDB

2. Give a high-level overview of how the app is organized

### Technolgoy 

* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [Axios](https://www.npmjs.com/package/axios)
* [OMDB API](http://www.omdbapi.com) 
* [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
* [Moment](https://www.npmjs.com/package/moment)
* [DotEnv](https://www.npmjs.com/package/dotenv)

3. Give start-to-finish instructions on how to run the app

## Instructions

1) Open Liri command line node application
2) Type in node liri.js

*//////// Insert Image of Selections

3) Select an option to:
    -Spotify-this-song
    -movie-this
    -concert-this
    -do-what-it-wants
    -exit

4) GitHub Repository: https://github.com/leeretk/liri-node-app


4. Include screenshots, gifs or videos of the app functioning


### Instructions

 ```
### API's

1) Bands in Town: https://rest.bandsintown.com/artists/
     * Name of the venue
     * Venue location
     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. Spotify: [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

     * It's on Netflix!

   * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

     * Edit the text in random.txt to test out the feature for movie-this and concert-this.

### BONUS


* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

* Make sure you append each command you run to the `log.txt` file. 

* Do not overwrite your file each time you run a command.

### Reminder: Submission on BCS

* Please submit the link to the Github Repository!

- - -
