const express = require("express");
const router = express.Router();
const database = require('../db/queries/database');

const {
  checkWolfram,
  getMovieDetails,
  getBookDetails,
  getProduct,
  getRestaurant,
} = require("./api");
const bodyParser = require("body-parser"); //


//an asynchronous function that processess the taskquery
async function processTask(task) {

  try {
    let result = await getRestaurant(task);
    if (
      result.Type &&
      (result.Type.includes("restaurant") || result.Type.includes("cafe"))
    ) {
      console.log("firing first if block");
      return { Title: task, Type: result.Type[0],Category: "eat",CategoryID: 1};
    }
    result = await getMovieDetails(task);
    if (result.Title) {
      if (
        result.Title.toLowerCase() === task.toLowerCase() &&
        (result.Type === "series" || result.Type === "movie")
      ) {
        console.log("firing second if block");
        return result;
      }
    }
    result = await checkWolfram(task);
    if (
      result &&
      result.includes("AdministrativeDivision" || result.includes("retail"))
    ) {
      console.log("firing third if block");
      return { Title: task, Type: "Product",Category: "buy",CategoryID: 4};
    }
    result = await getBookDetails(task);
    console.log("firing fourth if block");
    if (result.printType) {
      return result;
    }
    return `There were no results found for ${task}`;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}




router.post("/api", (req, res) => {
  console.log('req.body   ' , req.body);
  const task = req.body.input;

  if (!task) {
    // If the task title is not provided in the query parameters, send an error response
    return res.status(400).json({ error: "Task not provided" });
  }
  // Call the processTask function
  processTask(task)
    .then((result) => {
      console.log("Final Result:", result);
      return res.json(result);

    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

router.post("/newTask", (req, res) => {
  const newTask = req.body;
  console.log("req.body in /newTask   ",req.body);
  database.createNewTask(newTask)
  .then(() => {
    res.sendStatus(204); // Send 204 (No Content) for successful deletion.
    })
  .catch((e) => {
    console.error(e);
    res.sendStatus(500); // Send 500 (Internal Server Error) for other errors.
  });
});

module.exports = router;
