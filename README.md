# liri-node-app

## Problem Summary 
- As an entertainment consumer, I need a quick and easy means of finding entertainment options.

## Overview
- This application will be used to search Spotify for songs, Bands in Town for concerts, and OMDB for movies. 

## Installation & Prerequisites

![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/liri-node-app/dependent_packages.jpg?raw=true)

- The liri-node-app is dependent upon four packages:
 1. Axios
 2. DotEnv
 3. Moment
 3. Node-Spotify-API
 
- If you have cloned the repository with the package.json file, these packages can be installed using the npm-install command.

![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/liri-node-app/dependent_packages_install.jpg?raw=true)

## Instructions
- The liri-node-app can execute four different functions. 
  - Three functions ("movie-this", "spotify-this-song", and "concert-this") are executed in Node.js by using a command as the first argument and then a search term as the second argument, in the form of a string. For example, the arguments used for finding results for the movie "Shawshank Redemption" are the following: 
  
  ```
  node liri.js movie-this "Shawshank Redemption"
  ```
  - The final function, "do-what-it-says", takes it's commands from the random.txt file. This file is comma delimited where odd positions indicate a command and even positions execute the search term to be used for the preceding command.

  - Using following example of random.txt...
  
  ```
  spotify-this-song,Helter Skelter,movie-this,Shawshank Redemption,concert-this,Weezer
  ```
  - The three following functions will execute:
   - spotify-this-song will search for songs titled "Helter Skelter"
   - movie-this will search for movies titled "Shawshank Redemption"
   - concert-this will search for upcoming concerts from the band "Weezer"
- To execute the function, you only need one argument, "do-what-it-says":
  
  ```
  node liri.js do-what-it-says
  ```
### Execution and Results
- movie-this
  1) Enter following command: ```node liri.js movie-this "[Movie Name]"```
  2) When "Shawshank Redemption" is used as search term, the following results can be expected:
  - Console Log Results:
  ![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/liri-node-app/shawshank_redemption_movie_results.jpg?raw=true)
  - Results appended to log.txt file:
  ![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/liri-node-app/shawshank_redemption_movie_log_txt.jpg?raw=true)


- spotify-this-song
  1) Enter following command: ```node liri.js spotify-this-song "[Song Name]"```
  2) When "Helter Skelter" is used as search term, the following results can be expected:
  - Console Log Results:
  ![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/liri-node-app/helter_skelter_song_results.jpg?raw=true)
  - Results appended to log.txt file:
  ![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/liri-node-app/helter_skelter_song_log_txt.jpg?raw=true)


- concert-this
  1) Enter following command: ```node liri.js concert-this "[Band Name]"```
  2) When "Weezer" is used as search term, the following results can be expected:
  - Console Log Results:
  ![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/liri-node-app/weezer_band_results.jpg?raw=true)
  - Results appended to log.txt file:
  ![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/liri-node-app/weezer_band_log_txt.jpg?raw=true)

- do-what-it-says
  1) Enter following command: ```node liri.js do-what-it-says```
  2) When random.txt contains ```spotify-this-song,Helter Skelter,movie-this,Shawshank Redemption,concert-this,Weezer``` is used as search term, the following results can be expected:
   - Console Log Results:
  ![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/liri-node-app/do_what_it_says_results1.jpg?raw=true)
  ![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/liri-node-app/do_what_it_says_results2.jpg?raw=true)
   - Results appended to log.txt file:
  ![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/liri-node-app/do_what_it_says_log_txt1.jpg?raw=true)
  ![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/liri-node-app/do_what_it_says_log_txt2.jpg?raw=true)

## Built With
- The liri-node-app was built using Node.js and the following Node Package Manage modules:

 1. Axios
 2. DotEnv
 3. Moment
 3. Node-Spotify-API

- The application's data came from the following resources:

 1. spotify-this-song: Spotify API
 2. movie-this: OMBD API
 3. concert-this: Bands In Town API


## Authors 
- Developer: Nick Ramsay (@nick-ramsay)