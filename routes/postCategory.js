const express = require('express');
const router = express.Router();
const { checkWolfram } = require('./wolfram-api');
const bodyParser = require('body-parser') //

// Define a route to handle POST requests to /api/books path
router.post('/', (req, res) => {
  // Extract the task title from the query parameters
  const task = req.body;
  console.log('here in server  ' + task);

  if (!task) {
    // If the task title is not provided in the query parameters, send an error response
    return res.status(400).json({ error: 'Task not provided' });
  }

  /*getBookDetails(task) // Call the getTaskDetails function
    .then((taskDetails) => { // If the promise resolves, send the book details as a response
      res.json({ details: taskDetails }); // Send the task details as a JSON response
    })
    .catch((err) => { // If the promise rejects, send an error response
      console.log('Error fetching task details:', err.message);
      res.status(500).json({ error: 'Something went wrong' });
    });*/
});

// Export the router to be used in the main application
module.exports = router;
