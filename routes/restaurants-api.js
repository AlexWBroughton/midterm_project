const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/:id', (req, res) => {
  const restaurantId = req.params.id;

  console.log('make request for RestaurantId ', restaurantId);

});

module.exports = router;
