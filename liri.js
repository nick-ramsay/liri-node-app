require("dotenv").config();

var axios = require('axios');

var moment = require('moment');

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command;
//var search = process.argv[3];
var search = process.argv[3];

var concerts;
var spotifyData;


switch (process.argv[2]) {
    case "concert-this":
        command = process.argv[2];
        switch (process.argv[3]) {
            case undefined:
                console.log("No search criteria provided. Please try again.");
                break;
            default:
                search = process.argv[3];
                concert();
        }
        break;
    case "spotify-this-song":
        command = process.argv[2];
        switch (process.argv[3]) {
            case undefined:
                search = "The Sign";
                spotifyData();
                break;
            default:
                search = process.argv[3];
                spotifyData();
        }
        break;
    default:
        console.log("Sorry, invalid command. Try again.")
        break;
}

function spotifyData() {
    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        spotifyData = data.tracks.items;
        console.log(spotifyData[0].artists);
        renderSpotifyData();
    });
}

function renderSpotifyData() {
    for (i = 0; i < spotifyData.length; i++) {
        var separator = "--------------------------------------------";
        console.log("Artist(s): " + spotifyData[i].artists[0].name);
        console.log("Song: " + spotifyData[i].name);
        console.log("Album: " + spotifyData[i].album.name);
        console.log("Preview URL: " + spotifyData[i].preview_url);
        console.log(separator);
    }
}
//NOTE: This should be enhanced to report all artist names if multiple artists exist in array
function concert() {
    axios({
        method: 'get',
        url: 'https://rest.bandsintown.com/artists/' + search + '/events?app_id=codingbootcamp'
    }).then(function (response) {
        concerts = response.data;
        renderConcerts();
    })
}

function renderConcerts() {
    for (i = 0; i < concerts.length; i++) {
        var concertDate = new Date(concerts[i].datetime);
        var separator = "--------------------------------------------";
        console.log("Venue: " + concerts[i].venue.name);
        console.log("Location: " + concerts[i].venue.city + ", " + concerts[i].venue.country);
        console.log("Concert Date: " + moment(concertDate).format('MM/DD/YYYY'));
        console.log(separator);
    }
}