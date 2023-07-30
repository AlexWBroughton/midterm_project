const express = require('express');
const router = express.Router();
const getFilms = require('../db/queries/database.js');


router.get('/films', (req, res) => {
  res.send("here in films");
  //getFilms().then((response)=>
  //  res.send(response)
  //);
});
router.get('/restaurants', (req, res) => {
  res.send("here in restaurants");
  //getFilms().then((response)=>
  //  res.send(response)
  //);
});
router.get('/books', (req, res) => {
  res.send("here in books");
  //getFilms().then((response)=>
  //  res.send(response)
  //);
});
router.get('/products', (req, res) => {
  res.send("here in products");
  //getFilms().then((response)=>
  //  res.send(response)
  //);
});


module.exports = router;
