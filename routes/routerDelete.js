const express = require('express');
const router = express.Router();
const database = require('../db/queries/database');
const { js2xml } = require('xml-js');


// Delete task route (when user clicks garbage can icon)
router.delete("/:taskID", (req, res) => {
  const taskID = req.params.taskID;
  database.deleteTask(taskID)
    .then((isDeleted) => {
      if (isDeleted) {
        res.sendStatus(204); // Send 204 (No Content) for successful deletion.
      } else {
        res.sendStatus(404); // Send 404 (Not Found) if the task was not found or not deleted.
      }
    })
    .catch((e) => {
      console.error(e);
      res.sendStatus(500); // Send 500 (Internal Server Error) for other errors.
    });
});


module.exports = router;
