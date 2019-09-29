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
    case "movie-this":
        command = process.argv[2];
        switch (process.argv[3]) {
            case undefined:
                search = "Mr. Nobody";
                movies();
                break;
            default:
                search = process.argv[3];
                movies();
        }
        break;
    default:
        console.log("Sorry, invalid command. Try again.")
        break;
}

function movies() {
    axios({
        method: 'get',
        url: 'http://www.omdbapi.com/?apikey=trilogy&t=' + search
    }).then(function (response) {
        movies = response.data;
        renderMovies();
    })
}

function renderMovies() {
    var separator = "--------------------------------------------";
    var ratings = movies.Ratings;
    var rtRating = "Not Rated";
    for (i = 0; i < ratings.length; i++) {
        switch (ratings[i].Source) {
            case "Rotten Tomatoes":
                rtRating = ratings[i].Value;
                break;
        }
    }
    console.log(separator);
    console.log("Title: " + movies.Title);
    console.log("Year: " + movies.Year);
    console.log("IMDB Rating: " + movies.imdbRating);
    console.log("Rotten Tomatoes Rating: " + rtRating);
    console.log("Country of Prodution: " + movies.Country);
    console.log("Language: " + movies.Language);
    console.log("Plot: " + movies.Plot);
    console.log("Actors: " + movies.Actors);
    console.log(separator);
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
        console.log(separator);
        console.log("Artist(s): " + spotifyData[i].artists[0].name);
        console.log("Song: " + spotifyData[i].name);
        console.log("Album: " + spotifyData[i].album.name);
        console.log("Preview URL: " + spotifyData[i].preview_url);
        console.log(separator);
    }
}
//NOTE 1: Update so if search parameter is missing, it will specifically pick "The Sign" by Ace of Base.
//NOTE 2: This should be enhanced to report all artist names if multiple artists exist in array
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
        console.log(separator);
        console.log("Venue: " + concerts[i].venue.name);
        console.log("Location: " + concerts[i].venue.city + ", " + concerts[i].venue.country);
        console.log("Concert Date: " + moment(concertDate).format('MM/DD/YYYY'));
        console.log(separator);
    }
}