require("dotenv").config();

var axios = require('axios');

var moment = require('moment');

var Spotify = require('node-spotify-api');

var fs = require('fs');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command;
var search;

var concerts;
var spotifyData;

var randomParameters;


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
    case "do-what-it-says":
        command = process.argv[2];
        random();
        break;
    default:
        console.log("Sorry, invalid command. Try again.")
        break;
}

function random() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        randomParameters = data.split(",");
        renderRandom()
    })
}

function renderRandom() {
    for (i = 0; i < randomParameters.length; i++) {
        if (i !== 0 && (i % 2 !== 0)) {
            commandIndex = randomParameters[i - 1];
            searchIndex = randomParameters[i];
            switch (commandIndex) {
                case "movie-this":
                    search = searchIndex;
                    movies();
                    break;
                case "spotify-this-song":
                    search = searchIndex;
                    spotifyData();
                    break;
                case "concert-this":
                    search = searchIndex;
                    concert();
                    break;
                default:
                    console.log("Invalid parameter in random.txt document");
            }
        }
    }
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
    var ratings = movies.Ratings;
    var rtRating = "Not Rated";
    for (i = 0; i < ratings.length; i++) {
        switch (ratings[i].Source) {
            case "Rotten Tomatoes":
                rtRating = ratings[i].Value;
                break;
        }
    }
    var separator = "--------------------------------------------";
    var movieTitle = "Title: " + movies.Title;
    var movieYear = "Year: " + movies.Year;
    var movieIMBDRating = "IMDB Rating: " + movies.imdbRating;
    var movieRtRating = "Rotten Tomatoes Rating: " + rtRating;
    var movieCountry = "Country of Production: " + movies.Country;
    var movieLanguage = "Language: " + movies.Language;
    var moviePlot = "Plot: " + movies.Plot;
    var movieActors = "Actors: " + movies.Actors;

    console.log(separator);
    console.log(movieTitle);
    console.log(movieYear);
    console.log(movieIMBDRating);
    console.log(movieRtRating);
    console.log(movieCountry);
    console.log(movieLanguage);
    console.log(moviePlot);
    console.log(movieActors);
    console.log(separator);

    fs.appendFile('log.txt', separator + '\n' + 'Command: "' + command + '" / ' + 'Search Term: "' + search + '"\n' + movieTitle + '\n' + movieYear + '\n' + movieIMBDRating + '\n' + movieRtRating + '\n' + movieCountry + '\n' + movieLanguage +'\n' + moviePlot + '\n' + movieActors + '\n', function (err) {
        if (err) throw err;
    })
}

function spotifyData() {
    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        spotifyData = data.tracks.items;
        renderSpotifyData();
    });
}

function renderSpotifyData() {
    for (i = 0; i < spotifyData.length; i++) {
        var separator = "--------------------------------------------";
        var spotifyArtist = "Artist(s): " + spotifyData[i].artists[0].name;
        var spotifySong = "Song: " + spotifyData[i].name;
        var spotifyAlbum = "Album: " + spotifyData[i].album.name;
        var spotifyURL = "Preview URL: " + spotifyData[i].preview_url;
        console.log(separator);
        console.log(spotifyArtist);
        console.log(spotifySong);
        console.log(spotifyAlbum);
        console.log(spotifyURL);
        console.log(separator);
        fs.appendFile('log.txt', separator + '\n' + 'Command: "' + command + '" / ' + 'Search Term: "' + search + '"\n' + spotifyArtist + '\n' + spotifySong + '\n' + spotifyAlbum + '\n' + spotifyURL + '\n', function (err) {
            if (err) throw err;
        })
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
        var concertVenue = "Venue: " + concerts[i].venue.name;
        var concertLocation = "Location: " + concerts[i].venue.city + ", " + concerts[i].venue.country;
        var concertDate = "Concert Date: " + moment(concertDate).format('MM/DD/YYYY');
        console.log(separator);
        console.log(concertVenue);
        console.log(concertLocation);
        console.log(concertDate);
        console.log(separator);
        fs.appendFile('log.txt', separator + '\n' + 'Command: "' + command + '" / ' + 'Search Term: "' + search + '"\n' + concertVenue + '\n' + concertLocation + '\n' + concertDate+ '\n', function (err) {
            if (err) throw err;
        })
    }
}