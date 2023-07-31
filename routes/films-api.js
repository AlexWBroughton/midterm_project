const express = require('express');
const router = express.Router();
const database = require('../db/queries/database');
const { getMovieDetails } = require('./omdb-api');

// define a route to handle GET requests to /api/films path
router.get('/', (req, res) => {
  database.getFilms() // Fetch all films from the database
    .then(async (films) => { // Use async/await to fetch details for each film
      const filmDetailsPromises = films.map((film) => getMovieDetails(film.name));
      const filmDetails = await Promise.all(filmDetailsPromises);

      const filmsWithDetails = films.map((film, index) => {
        // Combine films data with their respective movie details
        return {
          ...film,
          details: filmDetails[index],
        };
      });

      res.json(filmsWithDetails); // Send final response with data
    })
    .catch((err) => {
      console.log('Error fetching films:', err.message);
      res.status(500).json({ error: 'Something went wrong' });
    });
});
// export the router to be used in the main application
module.exports = router;
