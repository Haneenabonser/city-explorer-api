'use strict';

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');


const server = express();
const PORT = process.env.PORT;

server.use(cors());

server.get('/weather', getLocation);


function getLocation(req, res) {
    let city = req.query.city_name;
    let lat = req.query.lat
    let lon = req.query.lon
    let key = process.env.UNSPLASH_KEY;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}&lat=${lat}&lon=${lon}`;



    axios
        .get(url)
        .then(result => {
            const weatherArray = result.data.map(item => {
                return new Weather(item);
            })
            res.send(weatherArray);
            // console.log(weatherArray);

        })
        .catch(err => {
            res.status(500).send(`error in getting the location data ==> ${err}`);
        })
};


class Weather {
    constructor(item) {
        this.cityName = item.city_name
        this.lat = item.lat
        this.lon = item.lon
    };
};
// console.log(Weather);





// http://localhost:3001/weather?cityName=amman&lat=31.95&lon=35.91
// http://lacolhost:3001/weather
// server.get('/weather',(req,res)=>{
//     let cityName = req.query.cityName
//     let lat = req.query.lat
//     let lon = req.query.lon

//     let weatherItem = weatherData.find(item=>{
//         if ( cityName == item.city_name.toLowerCase() && lat == item.lat && lon == item.lon)
//         return item;
//     })
//     // res.send(weatherItem);
// })




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
