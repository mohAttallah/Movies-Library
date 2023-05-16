"use strict";

const data = require("./Movie Data/data.json");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Home Page Endpoint

function Movie(id, title, release_date, poster_path, overview) {
  this.id = id;
  this.release_date = release_date;

  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
  Movie.allMovie.push(this);
}
Movie.allMovie = [];

// get Movie

app.get("/", handleMovie);
app.get("/favorite", handelFavorite);

function handleMovie(req, res) {
  Movie.allMovie = [];
  data.map((iteam) => {
    new Movie(iteam.title, iteam.poster_path, iteam.overview);
  });
  res.status(200).json(Movie.allMovie);
}

function handelFavorite(req, res) {
  res.status(200).send("Welcome to Favorite Page");
}

// Handels Errors
function handleServerErorr(req, res) {
  res.status(500).json({
    statusCode: 500,
    responseText: "Sorry, something went wrong",
  });
}

function handlePageNotFound(req, res) {
  res.status(404).json({
    statusCode: 404,
    responseText: "Sorry, the Page Not Found",
  });
}
//lab 11 End

// Lab 12 Start
//-------------------------------------------------------------

require("dotenv").config();
const axios = require("axios");
const PORT = process.env.PORT || 3005;

app.get("/trending", handelTrend);
app.get("/search", handelsearch);
app.get("/keyword", handelKeword);
app.get("/top", handletop);

async function handelTrend(req, res) {
  const axiosCallApi = await axios.get(
    `${process.env.TRENDING}?api_key=${process.env.APIKEY}`
  );
  axiosCallApi.data.results.map((iteam) => {
    new Movie(
      iteam.id,
      iteam.title,
      iteam.release_date,
      iteam.poster_path,
      iteam.overview
    );
  });
  res.status(200).json({
    code: axiosCallApi.status,
    message: "The data get from TMDB API",
    data: Movie.allMovie,
  });
}

function handelsearch(req, res) {
  const searchQuery = req.query.search;
  console.log(searchQuery);
  axios
    .get(
      `${process.env.SEARCHURL}?api_key=${process.env.APIKEY}&query=${searchQuery}`
    )
    .then((result) => {
      res.status(200).json({
        code: 200,
        number: result.data.number,
        recipes: result.data.results,
      });
    })
    .catch((err) => {
      errorHandler(err, req, res);
    });
}

// search by keywords

function handelKeword(req, res) {
  const keywordQuery = req.query.keyword;
  axios
    .get(
      `${process.env.KEYWORDURL}?api_key=${process.env.APIKEY}&query=${keywordQuery}`
    )
    .then((result) => {
      res.status(200).json({
        code: 200,
        number: result.data.number,
        recipes: result.data.results,
      });
    })
    .catch((err) => {
      errorHandler(err, req, res);
    });
}

async function handletop(req, res) {
  const axiosCallApi = await axios.get(
    `${process.env.TOPURL}?api_key=${process.env.APIKEY}`
  );
  axiosCallApi.data.results.map((iteam) => {
    new Movie(
      iteam.id,
      iteam.title,
      iteam.release_date,
      iteam.poster_path,
      iteam.overview
    );
  });

  res.status(200).json({
    code: axiosCallApi.status,
    message: "The data get from TMDB API",
    data: Movie.allMovie,
  });
}

// app.listen(PORT, () => {
//   console.log(`Up and Running on port ${PORT}`);
// });

// Lab 12 End
app.use(errorHandler);
function errorHandler(error, req, res, next) {
  res.status(500).json({
    code: 500,
    message: error.message || error,
  });
}

// Lab 13 Start
//-------------------------------------------------------------
const pg = require("pg");
const client = new pg.Client(process.env.DBURL);
app.post("/addMovie", handleAddMovieDB);
app.get("/getMovies", handleMovieDB);

function handleMovieDB(req, res, next) {
  const sql = `select * from movie_libarys`;
  client
    .query(sql)
    .then((data) => {
      res.json({
        count: data.rowCount,
        data: data.rows,
      });
    })
    .catch((err) => {
      errorHandler(err, req, res, next);
    });
}

function handleAddMovieDB(req, res, next) {
  const userInput = req.body;
  const sql = `insert into movie_libarys(title, poster_path, image, comments) values($1, $2, $3, $4) returning *`;

  const handleValueFromUser = [
    userInput.title,
    userInput.poster_path,
    userInput.image,
    userInput.comments
  ];

  client
    .query(sql, handleValueFromUser)
    .then((data) => {
      res.status(201).json(data.rows);
    })
    .catch((err) => {
      errorHandler(err, req, res, next);
    });
}

client.connect().then((con) => {
  console.log(con);
  app.listen(PORT, () => {
    console.log(`Up and Running on port ${PORT}`);
  });
});

// End lab 13 

//------------------------------------------------
// lab 14 start    


app.get("/getMovies/:id", handleMovieByID);
app.put("/UPDATE/:id",updateMovie );
app.delete("/DELETE/:id",deleteMovie);

// Get Movie by id 
function handleMovieByID(req, res, next){

  const id = req.params.id;
  const sql = `select * from movie_libarys where id = ${id}  `;

  client.query(sql).then(data => res.status(200).json(data.rows)).catch((err) => {
      errorHandler(err, req, res, next);}
    );
}
//update comments row from Movie libary by ID
function updateMovie(req, res, next){

  const id = req.params.id;
  const newData  = req.body; 
  const sql = `update movie_libarys set  comments=$1 where id = $2 returning *`;

  const updatedValue = [newData.comments ,id];

  client.query(sql, updatedValue).then(data =>res.status(202).json(data.rows)).catch((err) => {
    errorHandler(err, req, res, next)});
}

//delate data forom Movie libary by ID
function deleteMovie (req, res, next){
  const id = req.params.id;
  const sql =`DELETE from movie_libarys where id=${id}`; 
  client.query(sql).then(() => res.status(204)).json({
    "message" :`Row deleted Successfuly with id ${id}`
  }).catch((err) => {
    errorHandler(err, req, res, next)});
}


