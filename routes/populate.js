const express = require('express');
const router = express.Router();
const database = require('../db/queries/database');

//this route is now on film-api.js
// router.get('/films', (req, res) => {
//   database.getFilms()
//   .then((response) => res.send(response))
//   .catch((err) => {
//     console.log('in the router' + err.message);
//   });
// });

router.get('/restaurants', (req, res) => {
  database.getRestaurants()
   .then((response) => res.send(response))
   .catch((err) => {
     console.log('in the router' + err.message);
   });
 });

router.get('/books', (req, res) => {
  database.getBooks()
  .then((response) => res.send(response))
  .catch((err) => {
    console.log('in the router' + err.message);
  });
});

router.get('/products', (req, res) => {
  database.getProducts()
  .then((response) => res.send(response))
  .catch((err) => {
    console.log('in the router' + err.message);
  });
});


module.exports = router;
