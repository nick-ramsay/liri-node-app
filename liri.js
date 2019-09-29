require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

switch (process.argv[2]) {
    case "concert-this" || "spotify-this-song" || "movie-this" || "do-what-it-says":
        command = process.argv[2];
        console.log(command);
        break;
    default:
        console.log("Sorry, invalid command. Try again.");
}