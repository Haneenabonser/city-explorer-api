'use strict';

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const getWeatherData = require('./weather');
const getMovieData = require('./movies');


const server = express();
const PORT = process.env.PORT;
server.use(cors());

server.get('/weather', getWeatherData);
server.get('/movie', getMovieData);

server.get('/', (req, res) => {
    let str = 'hello from backend';
    res.send(str);
});

server.listen(PORT, () => {
    console.log(`Listening ${PORT}`);
});





































