require("dotenv").config();

var axios = require('axios');

var moment = require('moment');

var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);

var command;
//var search = process.argv[3];
var search = "metallica";

var concerts;

switch (process.argv[2]) {
    case "concert-this" || "spotify-this-song" || "movie-this" || "do-what-it-says":
        command = process.argv[2];
        switch (command) {
            case "concert-this":
                concert();
                break;
            default:
                ""
        }
        break;
    default:
        console.log("Sorry, invalid command. Try again.");
}


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