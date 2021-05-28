'use strict';

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');


const server = express();
const PORT = process.env.PORT;
server.use(cors());

// http://localhost:3001/weather?city=amman
server.get('/weather', getWeatherData);
server.get('/movie', getMovieData);



// for weather data 
 function getWeatherData(req, res) {
    let city = req.query.city;
    let key = process.env.WEATHER_API_KEY;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`;

    axios
    .get(url)
    .then(result => {
        let weatherArray = result.data.data.map(item => {
            return new Weather(item);
        });
        res.send(weatherArray);
    })
    .catch(error => {
        res.status(500).send(`Data for this city is not found`);
    })
};


// for movie data 
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&query=amman
function getMovieData(req,res){
    let movieQuery = req.query.movie;
    let movieKey = process.env.MOVIES_API_KEY;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${movieQuery}`;

    axios 
    .get(movieUrl)
    .then(result=>{
        let movieArray = result.data.results.map(item=>{
            return new Movie(item);
        })
        res.send(movieArray);
    })
    .catch(error=>{
        res.send('The movies data for this city is not found')
    });
};


class Movie{
    constructor(item){
        this.title = item.original_title;
        this.overview = item.overview;
        this.average_votes = item.vote_averag;
        this.total_votes = item.vote_count;
        this.image_url =`https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.popularity= item.popularity;
        this.released_on = item.release_date;
    }
};



class Weather {
    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
    };
};

server.get('/', (req, res) => {
    let str = 'hello from backend';
    res.send(str);
});


server.get('*', (req, res) => {
    res.status(404).send('not found');
});

server.listen(PORT, () => {
    console.log(`Listening ${PORT}`);
});





































