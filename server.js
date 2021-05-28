'use strict';

require('dotenv').config();
const weatherData = require('./data/weather.json')
const express = require('express');
const axios = require('axios');
const cors = require('cors');


const server = express();
const PORT = process.env.PORT;

server.use(cors());

// http://localhost:3001/weather?cityName=amman&lat=31.95&lon=35.91

server.get('/weather', (req, res) => {
    let cityName = req.query.cityName
    // let lat = req.query.lat
    // let lon = req.query.lon

    let weatherItem = weatherData.find(item => {
        // if (cityName == item.city_name.toLowerCase() && lat == item.lat && lon == item.lon)
        //     return item;
        if (cityName.toLowerCase() == item.city_name.toLowerCase())
            return item;
    });
    // res.send(weatherItem);
    try {
        let forcastArr = weatherItem.data.map(item => {
            return new Forcast(item);
        });
        res.send(forcastArr);

    } catch (error) {
        res.status(500).send('the data for this city not found');
    };
});

class Forcast {
    constructor(item) {
        this.description = item.weather.description;
        this.date = item.valid_date;
    }
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





































