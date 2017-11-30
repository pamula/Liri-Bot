

var keys = require("./keys.js");
var file = require("./liri1.js");
// var Spotify = require('spotify');
// var Spotify = require("node-spotify-api");

var Twitter = require("twitter");


var request = require("request");

var fs = require("fs");





// console.log(twitterKeys);

var x = "";

var nodeArgs = process.argv;

var query = [];

// var action = process.argv.slice(2);



for (var i = 2; i < nodeArgs.length; i++){



  query.push(nodeArgs[i]);



}



var argOne = query.splice(0,1);

var argTwo = query.join(" ");

var action = String(argOne);

var value = String(argTwo);



console.log("Searching for " +  value);

console.log("What command? " + action);





switch (action){

  case "my-tweets":

  myTweets();

  logAction();

  break;



  // case "spotify-this-song":

  // spotifyThisSong();

  // // getMeSpotify(functionData);



  // logAction();
  


  // break;



  case "movie-this":

  movieThis();

  logAction();

  break;



  // case "do-what-it-says":

  // doThis();

  // logAction();

  // break;



}



// Functions



// Commands for Liri to take in...

// * `my-tweets`

function myTweets(){



    var twitterKeys = keys.twitterKeys;

    // console.log("hello I am twitterKeys", keys,twitterKeys);



    var client = new Twitter({
//  //         
consumer_key: '8KGjPmZKx8uj7c9VpARG6ZLP2',
consumer_secret: 'wjMvb9GB2fyegD77sJ3amsHHti5c17EiZ6TKa3z432tAC0vEbG',
access_token_key: '933419115175297024-DYUfA3jwtCpuHH9uhjx2H5udJdPENvz',
access_token_secret: 't7DrelYIxVURJr17gyyoKeaot8Wthc2NlO0mw7oho9raW'
       });






    var params = {screen_name: "@preethiAlam", count:20};



    client.get("statuses/user_timeline", params, function(error, tweets, response) {

      if (error) {

        console.log(error);

    }



    for(var i = 0; i < tweets.length; i++){

        console.log("************");

        console.log(tweets[i].text);

        console.log("************");

    }



});

}










// // * `spotify-this-song`

// // Function for determining which command is executed

// function spotifyThisSong (value){


// // var spotifyKeys = keys.spotifyKeys;
// // var spotify = new Spotify({
// //     id: 'fab2126ac8614424800d28f2b2a0db8c' ,

// //  secret: '3506c2a32ba146a08b8370182e824ee1' 

// // });
// var Spotify = require('node-spotify-api');

// var spotify = new Spotify({
//   id: 'fab2126ac8614424800d28f2b2a0db8c',
//   secret: '3506c2a32ba146a08b8370182e824ee1' 

// });




//   spotify.search({

//     type:"track",

//     query: 'value'},
//      function(err, data){



//       if (err) {

//         console.log("Error occurred: " + err);

//         return;

//       }



//  // else{
// //         console.log(data);


// //       }
// //   });
// // }

//   // * if no song is provided then your program will default to

//   //   * "The Sign" by Ace of Base

//   if(value === ""){

//       console.log("************");

//       console.log("Artist: Ace of Base");

//       console.log("Song: The Sign");

//       console.log("Song Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");

//       console.log("Album: The Sign");

//       console.log("************");

//   }

//   else{



//   for (i = 0; i < 5; i++){



//       var results = data.tracks.items[i];



//       var artist = results.artists[0].name;

//       var songName = results.name;

//       var songLink = results.external_urls.spotify;

//       var album = results.album.name;



//       //Need: artist(s), song's name, preview link of song, album//

//       console.log("************");

//       console.log("Artist: " + artist);

//       console.log("Song: " + songName);

//       console.log("Song Link: " + songLink);

//       console.log("Album: " + album);

//       console.log("************");

//     }

// }



// });



// }










// * `movie-this`

function movieThis(){



  var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=798d16e44bf2357493e013567298dcd5&query=" + value;



  request(queryURL, function(error, response, body) {



  // If the request is successful (i.e. if the response status code is 200)

  if (error) {

    console.log("Error occurred: " + error);

    return;

}



if(value === ""){



    console.log("************");

    console.log("Movie Name: Mr.Nobody");

    console.log("Release Date: 2009-09-11");

    console.log("Synopsis: Nemo Nobody leads an ordinary existence with his wife and 3 children; one day, he wakes up as a mortal centenarian in the year 2092.");

    console.log("Average Vote: 7.9");

    console.log("Language: en");

    console.log("************");



}



else{

    console.log("************");

    console.log("Movie Name: " + JSON.parse(body).results[0].title);

    console.log("Release Date: " + JSON.parse(body).results[0].release_date);

    console.log("Synopsis: " + JSON.parse(body).results[0].overview);

    console.log("Average Vote: " + JSON.parse(body).results[0].vote_average);

    console.log("Language: " + JSON.parse(body).results[0].original_language);

    
    

}

});



}


// do-what-it says///////////function


// function doThis(){



// // Feel free to change the text in that document to test out the feature for other commands.

// fs.readFile("random.txt", "utf8", function(error,data){



//   var content = data.split(",");



//   // var array = data.toString().split("\n");

//   // console.log(array);



//   action = content[0];

//   value = content[1];



//   switch (action){

//   case "my-tweets":

//   myTweets();

//   break;



//   // case "spotify-this-song":

//   // spotifyThisSong();

//   // break;



//   case "movie-this":

//   movieThis();

//   break;



//   // case "do-what-it-says":

//   // doThis();

//   // break;



// }



// });



// }









function logAction (){



  var logItem = "\nSearch String:" + action + "," + value;

  console.log(logItem);



  fs.appendFile("log.txt",logItem, function(err){



    if (err) {

        console.log(err);

    }



    else {

        console.log("Content Added!");

    }



});

}




// ***********************************************************************************************






// console.log("this is also loaded");






    var fs = require("fs");



// Includes the NPM Request Package

var request = require("request");



// Grabs the keys variable.

var keys = require("./keys.js");



// Gets all of the Twitter keys from the keys.js file.

// var twitterID = keys.twitterKeys;

var spotifyID = keys.spotifyKeys;



// This variable captures the first argument.

var action = process.argv[2];

// This variable will (eventually) capture everything after the first argument.

var nodeArgs = process.argv;



// Create an empty variable for holding the song or movie name

var songTitle = "";

var movieName = "";





// Loop through all the words in the node argument

// And do a little for-loop magic to handle the inclusion of "+"s

for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

    songTitle = songTitle + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

    songTitle += nodeArgs[i];

  }

}













//Spotify variables

var Spotify = require('node-spotify-api');

var spotify = new Spotify(spotifyID);





// Switch/Case statements to activate a function.

switch (action) {

  



  case "spotify-this-song":

    spotifyThisSong();

    break;



  case "do-what-it-says":

    doWhatItSays();

    break;

}







// If the "spotify-this-song" argument was called, activate "spotifyThisSong" function

function spotifyThisSong() {

    

    if (songTitle === "") {

         spotify.search({ type: 'track', query: 'The Sign Ace of Base', limit: 20 }, function(err, data) {

            var artistName = "Artist(s): " + data.tracks.items[0].artists[0].name;

            var songName = "Song Title: " + data.tracks.items[0].name;

            var previewLink = "Preview Link: " + data.tracks.items[0].preview_url;

            var albumName = "Album Name: " + data.tracks.items[0].album.name;



            console.log(artistName);

            console.log(songName);

            console.log(previewLink); 

            console.log(albumName); 



            if (err) {

                return console.log('Error occurred to find "The Sign" : ' + err);

            }



            var spotifyLog = artistName + songName + previewLink + albumName;



                fs.appendFile('log.txt', spotifyLog, function(err) {



                  // If an error was experienced we say it.

                  if (err) {

                    console.log(err);

                  }



                });



         });

    }



    else {

        spotify.search({ type: 'track', query: songTitle, limit: 20 }, function(err, data) {

            var artistName = "Artist(s): " + data.tracks.items[0].artists[0].name;

            var songName = "Song Title: " + data.tracks.items[0].name;

            var previewLink = "Preview Link: " + data.tracks.items[0].preview_url;

            var albumName = "Album Name: " + data.tracks.items[0].album.name;



            console.log(artistName);

            console.log(songName);

            console.log(previewLink); 

            console.log(albumName);



            if (err) {

                return console.log('Error occurred: ' + err);

            }



            var spotifyLog = artistName + songName + previewLink + albumName;



                fs.appendFile('log.txt', spotifyLog, function(err) {



                  // If an error was experienced in writing to log.txt:

                  if (err) {

                    console.log(err);

                  }



                });



        });

    }

    // search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);





}








// If the "do-what-it-says" argument was called, activate "doWhatItSays" function

function doWhatItSays() {

    // NOTE TO SELF: this is what is inside random.txt:  spotify-this-song,"I Want it That Way"

    fs.readFile("random.txt", "utf8", function(error, data) {



        // If the code experiences any errors it will log the error to the console.

        if (error) {

            return console.log(error);

        }



        // Split the data by commas (to make it more readable and to work with it)

        var dataArr = data.split(",");



        action = dataArr[0];

        songTitle = dataArr[1];

        spotifyThisSong();



    });



}


// module.exports = lirikeys;

