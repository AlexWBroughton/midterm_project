const express = require('express');
const router = express.Router();
const { getBookDetails } = require('./books-api'); //

// Define a route to handle GET requests to /api/books path
router.get('/', (req, res) => {
  // Extract the book title from the query parameters
  const bookTitle = req.query.title;

  if (!bookTitle) {
    // If the book title is not provided in the query parameters, send an error response
    return res.status(400).json({ error: 'Book title not provided' });
  }

  getBookDetails(bookTitle) // Call the getBookDetails function
    .then((bookDetails) => { // If the promise resolves, send the book details as a response
      res.json({ details: bookDetails }); // Send the book details as a JSON response
    })
    .catch((err) => { // If the promise rejects, send an error response
      console.log('Error fetching book details:', err.message);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// Export the router to be used in the main application
module.exports = router;
