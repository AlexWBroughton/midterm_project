const express = require('express');
const router = express.Router();
const database = require('../db/queries/database');

router.put('/:taskID', (req, res) => {
  const taskId = req.params.taskID;
  const name = req.body.name_of_todo;
  const date = req.body.date_added;
  const category_id = req.body.category_id;
  const completed = req.body.completed;

  console.log(`Received request with taskId=${taskId}, name=${name}, date=${date}, category_id=${category_id}, completed=${completed}`);

  if (taskId === null || name === null || date === null || category_id === null || completed === null) {
    return res.status(400).json({ message: 'Missing required field.' });
  }

  database.updateTask(taskId, name, date, category_id, completed)
    .then(rowsUpdated => {
      if(rowsUpdated > 0){
        res.status(200).json({ message: 'Task updated successfully.' });
      } else {
        res.status(404).json({ message: 'No task found with the given id.' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'An error occurred while updating the task.', error: err.message });
    });
});

module.exports = router;
