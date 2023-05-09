"use strict"

const data = require('./Movie Data/data.json');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())

// Home Page Endpoint 

function Movie (title, poster_path, overview){
    this.title= title;
    this.poster_path= poster_path;
    this.overview= overview;
    Movie.allMovie.push(this);
}
 Movie.allMovie=[];

// get Movie 

app.get('/', handleMovie);
app.get('/favorite', handelFavorite)
app.get('/')

function handleMovie(req, res)  {
    data.map(iteam=>{
        new Movie (iteam.title, iteam.poster_path, iteam.overview);
    })
    res.status(200).json(Movie.allMovie);
}

function handelFavorite(req, res){
    res.status(200).send("Welcome to Favorite Page");
}


// Handels Errors
function handleServerErorr(req, res)  {
    res.status(500).json({
        statusCode: 500, 
        responseText: "Sorry, something went wrong"
    })
}

function handlePageNotFound(req, res)  {
    res.status(404).json({
        statusCode: 404, 
        responseText: "Sorry, the Page Not Found"
    })
}



app.listen(3000);

