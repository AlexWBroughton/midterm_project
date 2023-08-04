const express = require("express");
const router = express.Router();
const database = require("../db/queries/database");


router.put("/completed", (req, res) => {
  console.log('here in completed router');

  const completed = req.body.completed;
  const date_completed = req.body.date_completed;
  const id = req.body.id;
  console.log(id);
  database.completeTask(id, completed, date_completed)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error completing task." });
    });
});

/*
router.put("/:taskID", (req, res) => {
  //query the databse and make the changes to the database.
  const taskId = req.body.id;
  const name = req.body.name_of_todo;
  const date = req.body.date_added;
  const category_id = req.body.category_id;
  const completed = req.body.completed;

  database.updateTask(taskId, name, date, category_id, completed);
});
*/

module.exports = router;
