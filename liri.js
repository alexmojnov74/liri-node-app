var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');

var dotenv = require("dotenv").config();
var keys = require("./keys.js");

//moment js
var moment = require('moment');
moment().format();

//spotify keys
var spotify = new Spotify(keys.spotify);

//variable for input
var command = process.argv[2];
var input = process.argv[3];

// concert-this

function concertIt(bandQuery) {

   
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandQuery + "/events?app_id=codingbootcamp#";
  
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var concertData = JSON.parse(body);

            var concertDT = concertData[0].datetime
            var momentDT = moment().format('L');

            console.log("===============================");
           
            console.log("Venue Name : " + concertData[0].venue.name +
                
                "\nVenue Location: " + concertData[0].venue.city + "," + concertData[0].venue.country +
                "\nDate of the Event: " + momentDT + concertDT +
                "\n===============================");
            
        };
    });
}
// spotify-this-song
function spotifyIt(musicSearch) {

    
    if (musicSearch === undefined || null) {
        musicSearch = "Hotel California";
    }

    spotify.search({ type: 'track', query: musicSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
                    
        else {
            for (i = 0; i < data.tracks.items.length && i < 5; i++){
            
                var musicQuery = data.tracks.items[i];
             
                console.log("Artist: " + musicQuery.artists[0].name +
               
                "\nSong Name: " + musicQuery.name +
                
                "\nLink to Song: " + musicQuery.preview_url +
                
                "\nAlbum Name: " + musicQuery.album.name +
                "\n===============================");
            }
        };  
    });
}


    // movie-this
function movieIt (movieQuery) {
 
     if (movieQuery === undefined || null) {
            movieQuery = "Titanic";
        }
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy";

   
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) { 
        
       if (!error && response.statusCode === 200) {      
            var movieData = JSON.parse(body);
                                   
    
                console.log("===============================");
                    
                console.log("Movie Title: " + movieData.Title +
      
                "\nYear: " + movieData.released +
      
                "\nIMDB Rating: " + movieData.imdbRating +
       
                "\nRotten Tomatoes Rating: " + movieData.Ratings[1].Value +
           
                "\nCountry: " + movieData.Country +
        
                "\nLanguage: " + movieData.Language +
          
                "\nPlot: " + movieData.Plot +
          
                "\nActors: " + movieData.Actors +
                "\n===============================");             
        
        };
    }); 
}

// Switch for commands for all functions
var ask = function (commands, funData){
    switch(commands) {
        case "concert-this":
            concertIt(funData);
            break;
        case "movie-this" :
            movieIt(funData);
            break;    
        case 'spotify-this-song':
            spotifyIt(funData); 
            break;
        case 'do-what-it-says':
            doWhatItSays(); 
            break;
        default:
        console.log("Invalid command. Please try again");
    }
};

//Do what it says reads text from random.txt file, command is ran
var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
            var randomText = data.split(",");
        
        if (randomText.length == 2) {
            ask(randomText[0], randomText[1]);
        }
        else if (randomText.length == 1) {
            ask(randomText[0]);
        }
    });
}
// asigns args to ask for switch case
ask (command, input);