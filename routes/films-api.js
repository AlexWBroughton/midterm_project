const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/:id', (req, res) => {
  const filmId = req.params.id;
  const urlOMDb = `http://www.omdbapi.com/?i=${filmId}&apikey=60b49183`;

  request(urlOMDb, (error, response, body) => {
    if (error) {
      // If an error occurs with the first API, use the second API
      const urlMovieDB = `https://api.themoviedb.org/3/movie/${filmId}?api_key=8c66671783ac8112ab6ba0fd4bc31faa`;

      request(urlMovieDB, (error, response, body) => {
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.json(JSON.parse(body));
        }
      });
    } else {
      res.json(JSON.parse(body));
    }
  });
});

module.exports = router;
