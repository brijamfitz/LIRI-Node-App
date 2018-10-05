require("dotenv").config();

// GLOBAL VARIABLES
// =============================================================================
var nodeArgs = process.argv;
var commandArg = process.argv[2];
var argsArray = [];

for (var i = 3; i < nodeArgs.length; i++) {
    argsArray.push(nodeArgs[i]);
}

var userInput = argsArray.join(' ');

// SPOTIFY
// spotify-this-song
// =============================================================================
// Import keys.js file and store in variable
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

function spotifyThisSong() {
  spotify.search({ type: 'track', limit: 1, query: userInput }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var artistName = data.tracks.items[0].album.artists[0].name;
    var songTitle = data.tracks.items[0].name;
    var albumTitle = data.tracks.items[0].album.name;
    var songPreview = data.tracks.items[0].preview_url;
    
    console.log('The name of the artist is: ' + artistName  + '.');
    console.log('The name of the song is: ' + songTitle  + '.');
    console.log('The name of the album is: ' + albumTitle  + '.');
    console.log('Follow this link for a preview of the song: ' + songPreview);
  });
}
function spotifyDefault() {
  spotify.search({ type: 'track', limit: 1, query: 'Ace of Base' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var artistName = data.tracks.items[0].album.artists[0].name;
    var songTitle = data.tracks.items[0].name;
    var albumTitle = data.tracks.items[0].album.name;
    var songPreview = data.tracks.items[0].preview_url;
    
    console.log('The name of the artist is: ' + artistName  + '.');
    console.log('The name of the song is: ' + songTitle  + '.');
    console.log('The name of the album is: ' + albumTitle  + '.');
    console.log('Follow this link for a preview of the song: ' + songPreview);
  });
}

// BANDS IN TOWN
// concert-this
// =============================================================================
var request = require('request');
var moment = require('moment');

function concertThis() {
  request('https://rest.bandsintown.com/artists/' + userInput + '/events?app_id=codingbootcamp', function (error, response, body) {
      if (error) {
        // Print the error if one occurred
        console.log('error:', error); 
      }
      // Print the response status code if a response was received
      console.log('statusCode:', response && response.statusCode); 

      var body = JSON.parse(body);
      var venueName = body[0].venue.name;
      var venueCity = body[0].venue.city + ', ' + body[0].venue.region;
      var concertDate = body[0].datetime.split('T');
      var concertDateSplit = concertDate[0];
      var concertMoment = moment(concertDateSplit).format('MM/DD/YYYY');

      console.log('The next concert is at: ' + venueName  + '.');
      console.log('The venue is located in: ' + venueCity  + '.');
      console.log('The concert is on: ' + concertMoment  + '.'); // Add moment.js
  });
}

// OMDB
// movie-this
// =============================================================================
function movieThis() {
  request('http://www.omdbapi.com/?t=' + userInput + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
    if (error) {
      // Print the error if one occurred  
      console.log('error:', error); 
    }
    // Print the response status code if a response was received
    console.log('statusCode:', response && response.statusCode); 

    var body = JSON.parse(body);

    console.log(body.Title);
    console.log('It was released in ' + body.Year  + '.');
    console.log('It was directed by ' + body.Director + '.');
    console.log('IMDB gives it a ' + body.imdbRating + ' out of 10.');
    console.log('Rotten Tomatoes gives it a ' + body.Ratings[1].Value + ' rating.');
    console.log('It was produced in ' + body.Country  + '.');
    console.log('The language(s) is ' + body.Language  + '.');
    console.log('The cast includes ' + body.Actors  + '.');
    console.log('And here is a short summary of the plot: ' + body.Plot);
  });
}
function movieDefault() {
  request('http://www.omdbapi.com/?t=' + 'Mr. Nobody' + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
    if (error) {
      // Print the error if one occurred  
      console.log('error:', error); 
    }
    // Print the response status code if a response was received
    console.log('statusCode:', response && response.statusCode); 

    var body = JSON.parse(body);

    console.log(body.Title);
    console.log('It was released in ' + body.Year  + '.');
    console.log('It was directed by ' + body.Director + '.');
    console.log('IMDB gives it a ' + body.imdbRating + ' out of 10.');
    console.log('Rotten Tomatoes gives it a ' + body.Ratings[1].Value + ' rating.');
    console.log('It was produced in ' + body.Country  + '.');
    console.log('The language(s) is ' + body.Language  + '.');
    console.log('The cast includes ' + body.Actors  + '.');
    console.log('And here is a short summary of the plot: ' + body.Plot);
  });
}

// DO-WHAT-IT-SAYS
// =============================================================================
var fs = require('fs');

function doWhatItSays() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if (error) {
      console.log(error);
    }

    var dataSplit = data.split(',');
    var quoteSplit = dataSplit[1].split('"');
    userInput = quoteSplit[1];

    if (dataSplit[0] === 'spotify-this-song') {
      spotifyThisSong();
    }
    else if (dataSplit[0] === 'movie-this') {
      movieThis();
    }
    else if (dataSplit[0] === 'concert-this') {
      concertThis();
    }
  })
}

// FUNCTION CALLS
// =============================================================================
// switch (commandArg) {
//   case 'spotify-this-song':
//   spotifyThisSong();
//   break;

//   case 'concert-this':
//   concertThis();
//   break;

//   case 'movie-this':
//   movieThis();
//   break;

//   case 'do-what-it-says':
//   doWhatItSays();
//   break;
// }

if (commandArg === 'spotify-this-song' && argsArray.length >= 1) {
  spotifyThisSong();
}
else if (commandArg === 'spotify-this-song' && argsArray.length === 0) {
  spotifyDefault();
}
else if (commandArg === 'movie-this' && argsArray.length >= 1) {
  movieThis();
}
else if (commandArg === 'movie-this' && argsArray.length === 0) {
  movieDefault();
}
else if (commandArg === 'concert-this' && argsArray.length >= 1) {
  concertThis();
}
else if (commandArg === 'do-what-it-says') {
  doWhatItSays();
}