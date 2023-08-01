const express = require('express');
const router = express.Router();
const { checkWolfram, getMovieDetails,getBookDetails,getProduct,getRestaurant } = require('./api');
const bodyParser = require('body-parser') //


///it wil pick up the path of /tasks/
router.post('/', (req, res) => {
  // Extract the task title from the query parameters
  const task = Object.values(req.body);



  if (!task) {
    // If the task title is not provided in the query parameters, send an error response
    return res.status(400).json({ error: 'Task not provided' });
  }


// filter with if statements (figure out second)
// filter through apis (figure out first)

//pass the task to Wolfram so that Wolfram can categorize the task.
    getBookDetails(task).then((response)=>{
      console.log("response =" ,response);
      res.send(response);
    });
  });

  // pass through to body after


module.exports = router;
