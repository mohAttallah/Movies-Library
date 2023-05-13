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

app.listen(PORT, () => {
  console.log(`Up and Running on port ${PORT}`);
});
