const express = require('express');
const router = express.Router();
const database = require('../db/queries/database');


//Define a route to handle GET requests to /tasks path

// Define a route to handle GET requests to /films path
router.get('/films', (req, res) => {
  database.getFilms() // Fetch all tasks from the database
    .then((tasks) => {
      console.log(tasks);
      res.json(tasks); // Send final response with data
    })
    .catch((err) => {
      console.log('Error fetching tasks:', err.message);
      res.status(500).json({ error: 'Something went wrong' });
    });
});
router.get('/books', (req, res) => {
  database.getBooks() // Fetch all tasks from the database
    .then((tasks) => {
      console.log(tasks);
      res.json(tasks); // Send final response with data
    })
    .catch((err) => {
      console.log('Error fetching tasks:', err.message);
      res.status(500).json({ error: 'Something went wrong' });
    });
});
router.get('/restaurants', (req, res) => {
  database.getRestaurants() // Fetch all tasks from the database
    .then((tasks) => {
      console.log(tasks);
      res.json(tasks); // Send final response with data
    })
    .catch((err) => {
      console.log('Error fetching tasks:', err.message);
      res.status(500).json({ error: 'Something went wrong' });
    });
});
router.get('/products', (req, res) => {
  database.getProducts() // Fetch all tasks from the database
    .then((tasks) => {
      console.log(tasks);
      res.json(tasks); // Send final response with data
    })
    .catch((err) => {
      console.log('Error fetching tasks:', err.message);
      res.status(500).json({ error: 'Something went wrong' });
    });
});
router.get('/', (req, res) => {
  database.getTasks() // Fetch all tasks from the database
    .then((tasks) => {
      console.log(tasks);
      res.json(tasks); // Send final response with data
    })
    .catch((err) => {
      console.log('Error fetching tasks:', err.message);
      res.status(500).json({ error: 'Something went wrong' });
    });
});
     /* // Use async/await to fetch details for each film
      const taskDetailsPromises = tasks.map((task) => getMovieDetails(task.name));
      const taskDetails = await Promise.all(taskDetailsPromises);

      const tasksWithDetails = tasks.map((task, index) => {
        // Combine tasks data with their respective movie details
        return {
          ...task, //Spread operator to copy all properties from task object
          details: taskDetails[index],
        };
       });*/


//Flow:
// 1. Define a route to handle GET requests to '/films' path
// 2. Fetch all tasks from the database
// 3. Use async/await to fetch details for each film
// 4. Combine tasks data with their respective movie details
// 5. Send the final response with data

//--------------------older code-------------
// // define a route to handle GET requests to /films path
// router.get('/films', (req, res) => {
//   database.getFilms() // Fetch all films from the database
//     .then(async (films) => { // Use async/await to fetch details for each film
//       const filmDetailsPromises = films.map((film) => getMovieDetails(film.name));
//       const filmDetails = await Promise.all(filmDetailsPromises);

//       const filmsWithDetails = films.map((film, index) => {
//         // Combine films data with their respective movie details
//         return {
//           ...film,
//           details: filmDetails[index],
//         };
//       });

//       res.json(filmsWithDetails); // Send final response with data
//     })
//     .catch((err) => {
//       console.log('Error fetching films:', err.message);
//       res.status(500).json({ error: 'Something went wrong' });
//     });
// });
// // export the router to be used in the main application


module.exports = router;
