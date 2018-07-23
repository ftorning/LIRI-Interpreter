# LIRI-Interpreter

### Overview

LIRI is a NPM CLI tool that takes user input and provides them with Twitter, Spotify, or OMDB data.

### Getting Started

1. Clone the repository

2. `npm install` required packages listed in packages.json

3. You will need to provide your own .env file with credentials for Twitter, Spotify, and OMDB

### Using the Tool

The tool accepts 4 parameters
    
    * `my-tweets <search>`
    * `spotify-this-song <search>`
    * `movie-this <search>`
    * `do-what-it-says`

Note that my-tweets will accept and user screen-name, but will only display results for the account associated with the API-key. All search parameters are nullable and will provide default data.

Example command:

`$ node liri.js movie-this Guardians of the Galaxy`

### Author

Fraser Torning