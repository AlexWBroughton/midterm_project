const express = require('express');
const router = express.Router();
const database = require('../db/queries/database');


//Define a route to handle GET requests to /tasks path


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
  console.log('here in restaurants');
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
router.get('/others', (req, res) => {
  database.getOthers() // Fetch all tasks from the database
    .then((tasks) => {
      console.log(tasks);
      res.json(tasks); // Send final response with data
    })
    .catch((err) => {
      console.log('Error fetching tasks:', err.message);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

router.get('/lastID', (req, res) => {
  console.log("here in the /LastID");
  database.getLastTaskID() // Fetch all tasks from the database
    .then((taskID) => {
      console.log(taskID + '   taskID');
      res.json(taskID); // Send final response with data
    })
    .catch((err) => {
      console.log('Error fetching tasks:', err.message);
      res.status(500).json({ error: 'Something went wrong' });
    });
});


router.get('/', (req, res) => {
  database.getTasks() // Fetch all tasks from the database
    .then((tasks) => {
      console.log(tasks + '   tasks');
      res.json(tasks); // Send final response with data
    })
    .catch((err) => {
      console.log('Error fetching tasks:', err.message);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

module.exports = router;
