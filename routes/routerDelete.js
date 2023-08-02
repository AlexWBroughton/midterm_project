const express = require('express');
const router = express.Router();
const database = require('../db/queries/database');
const { js2xml } = require('xml-js');


// Delete task route (when user clicks garbage can icon)
router.delete("/:taskID", (req,res) => {
  const taskID = req.params.taskID;
  database.deleteTask(taskID)
    .then(() => {
      res.send(`The ${taskID} was deleted`);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


module.exports = router;
