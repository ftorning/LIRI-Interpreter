require("dotenv").config();
var request = require("request");
var fs = require('fs');
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var searchType = process.argv[2];
var searchParams = process.argv.slice(3);

var twitterClient = new Twitter(keys.twitter);
var spotifyClient = new Spotify(keys.spotify);


switch (searchType.toLowerCase()) {
    case 'my-tweets':
        twitterRequest(searchParams);
        break;
    case 'spotify-this-song':
        spotifyRequest(searchParams);
        break;
    case 'movie-this':
        movieRequest(searchParams);
        break;
    case 'do-what-it-says':
        console.log("do-what-it-says");
        break;
    default:
        console.log("Unknown command: " + searchType)
        console.log("\nthe following commands are supported:\nmy-tweets\nspotify-this-song <search string>\nmovie-this <search string>\ndo-what-it-says")
        break;
}

function twitterRequest(searchParams=null) {
    if (!searchParams || searchParams.length < 1) {
        var params = {screen_name: 'Fraser01781053'};
    } else {
        var params = {screen_name: searchParams};
    }

    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = tweets.length - 1; i >= 0; i--) {
                console.log(tweets[i].created_at + "\t" + tweets[i].text);
            }
        } else {
            console.log(error);
        }
    });
};

function spotifyRequest(searchParams=null) {
    if (!searchParams || searchParams.length < 1) {
        var params = "The Sign";
    } else {
        var params = searchParams.join(" ");
    }
    
    spotifyClient.search({ type: 'track', query: params }, function(error, data) {
        if (!error) {
            res = data.tracks.items[0];
            var artists = []
            for (var i = 0; i < res.artists.length; i ++) {
                artists.push(res.artists[i].name)
            }
            console.log("Artist(s): " + artists.join(" "));
            console.log("\nSong Title: " + res.name);
            console.log("\nPreview: " + res.preview_url);
            console.log("\nAlbum: " + res.album.name);
        } else {
            console.log('Error occurred: ' + error);
        }
    });
}

function movieRequest(searchParams=null) {
    if (!searchParams || searchParams.length < 1) {
        var params = 'Mr Nobody'.split(" ").join("+");
    } else {
        var params = searchParams.join("+");
    }
    var url = "https://www.omdbapi.com/?t="+ params + "&plot=short&type=movie&apikey=" + keys.omdb.consumer_key
    request(url, function(error, response, body) {
                if (!error) {
                    var body = JSON.parse(body);
                    var ratings = body.Ratings;
                    var rottenTomatoes = "Not Rated";
                    var imdb = "Not Rated";
                    
                    for (var i = 0; i < ratings.length; i++) {
                        if (ratings[i].Source === 'Rotten Tomatoes') {
                            rottenTomatoes = ratings[i].Value;
                        } else if (ratings[i].Source === 'Internet Movie Database') {
                            imdb = ratings[i].Value;
                        }
                    }                    

                    console.log("Title: " + body.Title);
                    console.log("\nRelease Year: " + body.Year);
                    console.log("\nIMDB Rating: " + imdb);
                    console.log("\nRotten Tomatoes Rating: " + rottenTomatoes);
                    console.log("\nCountries: " + body.Country);
                    console.log("\nLanguage: " + body.Language);
                    console.log("\nPlot: " + body.Plot);
                    console.log("\nActors: " + body.Actors);
                } else {
                    console.log("Error occured: " + error);
                }
    })
}
