'use strict';

const axios = require('axios');



// for weather data 
// http://localhost:3001/weather?city=amman

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


class Weather {
    constructor(item) {
        this.date = item.datetime;
        this.description = item.weather.description;
    };
};


module.exports = getWeatherData;