//*********************************************GLOBAL VARIABLES**************************/

require("dotenv").config();
var fs = require("fs");
var axios = require("axios");


  //Rotten Tomatoes with Axios.
function getRottenTomatoes(qryParameter) {

  console.log(qryParameter)

  var queryUrl = "https://developer.fandango.com/Rotten_Tomatoes/?t=" + qryParameter + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(

    function (response.data) {
      console.log(response.data);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings);
      console.log("Rotten Tomatoes Rating: " + getRottenTomatoes(response.data.Value));
      fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + getRottenTomatoes(response.data.Value) + "\n");
      prompt();
    })

    getRottenTomatoes(qryParameter);
    // .catch(function (error) {

    //   if (error.response.statusCode === 200) {
    //     console.log("---------------Data---------------");
    //     console.log(error.response.data);
    //     console.log("---------------Status---------------");
    //     console.log(error.response.status);
    //     console.log("---------------Status---------------");
    //     console.log(error.response.headers);
    //   } else if (error.request) {
    //     console.log(error.request);
    //   } else {
    //     console.log("Error", error.message);
    //   }
    //   console.log(error.config);
    // }
    // );
}