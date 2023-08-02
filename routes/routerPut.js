const express = require('express');
const router = express.Router();
const database = require('../db/queries/database');


router.put('/:taskID', (req, res) => {
  //query the databse and make the changes to the database.
  const taskId = req.body.id;
  const name = req.body.name_of_todo;
  const date = req.body.date_added;
  const category_id = req.body.category_id;
  const completed = req.body.completed;

  database.updateTask(taskId,name,date,category_id,completed);

});

module.exports = router;
