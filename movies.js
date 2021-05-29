'use strict';

const axios = require('axios');


let inMemory = {};

// for movie data 
// http://localhost:3001/movie?query=amman
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&query=amman
function getMovieData(req,res){
    let movieQuery = req.query.query;
    let movieKey = process.env.MOVIES_API_KEY;
    let movieUrl=`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${movieQuery}`;

    if (inMemory[movieQuery]!== undefined){
        console.log('from memory');
        res.send(inMemory[movieQuery]);
    }else{
        console.log('from API');
        axios 
        .get(movieUrl)
        .then(result=>{
            let movieArray = result.data.results.map(item=>{
                return new Movie(item);
            })
            // console.log(result.data);
            // console.log(movieArray);
            inMemory[movieQuery]=movieArray;
            res.send(movieArray);
        })
        .catch(error=>{
            res.send('The movies data for this city is not found')
        });
    }
};


class Movie{
    constructor(item){
        this.title=item.original_title;
        this.overview=item.overview;
        this.average_votes=item.vote_average;
        this.total_votes=item.vote_count;
        this.image_url=`https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        this.popularity=item.popularity;
        this.released_on=item.release_date;
    }
};

module.exports = getMovieData;