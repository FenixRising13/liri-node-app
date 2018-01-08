require("dotenv").config();
var Request = require('request')
var Twitter = require('twitter')
var Spotify = require('node-spotify-api')
var fs = require('fs');
var keys = require('./keys');

var action = process.argv[2];
var nodeArgs = process.argv;
var value = '';

for (var i = 3; i < nodeArgs.length; i++) {
    value += nodeArgs[i] + "+";
}

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);


// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (action) {
    case "my-tweets":
        my_tweets();
        break;

    case "movie-this":
        movie_this(value);
        break;

    case "do-what-it-says":
        do_what_it_says();
        break;

    case "spotify-this-song":
        spotify_this_song(value);
        break;
}


function my_tweets() {
    var params = { screen_name: 'fenixrising13' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            }
        }
    });
}

function spotify_this_song(value) {

    spotify

        .search({ type: 'track', query: 'All the Small Things' })
        .then(function (response) {

            var results = response.tracks.items;

            for (var i = 0; i < results.length; i++) {
                if (results[i]) {

                    // console.log(results);
                    console.log('Artists: ' + results[i].album.artists[0].name);
                    console.log('Song name: ' + results[i].name);
                    console.log('Preview: ' + results[i].album.href);
                    console.log('Album: ' + results[i].album.name);
                }

            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function movie_this(value) {
    // Request omdbapi
    Request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        var RottenTomatoes = "Source.Rotten Tomatoes.value"

        // Ensure there is no error before output response
        if (!error && response.statusCode === 200) {

            console.log('Title: ' + JSON.parse(body).Title);
            console.log('Year: ' + JSON.parse(body).Year);
            console.log('IMDBRating: ' + JSON.parse(body).imdbRating);
            console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
            console.log('Country: ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Actors: ' + JSON.parse(body).Actors);

            // Then split it by commas (to make it more readable)
            // var dataArr = body.split(",");

            // We will then re-display the content as an array for later use.
            // console.log(dataArr);
        }

    })
}

function do_what_it_says() {
    // File system request to read random.txt
    fs.readFile('random.txt', "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // Console log the data
        console.log(data);

        data = data.split(",");

        for (var i = 0; i < data.length; i++) {
            if (data[i]) {
                process.argv[2] == data[0];
                process.argv[3] == data[1];

            }

        }
        console.log('Action: ' + data[0]);
        console.log('Value: ' + data[1]);
    })



}