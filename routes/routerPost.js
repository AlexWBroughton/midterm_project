const express = require("express");
const router = express.Router();
const {
  checkWolfram,
  getMovieDetails,
  getBookDetails,
  getProduct,
  getRestaurant,
} = require("./api");
const bodyParser = require("body-parser"); //

async function processTask(task) {
  const result1 = await getRestaurant(task);
  const result2 = await getMovieDetails(task);
  const result3 = await getBookDetails(task);
  const result4 = await checkWolfram(task);

  console.log("##1 result1 --> ", result1);
  console.log("##2 result2 --> ", result2);
  console.log("##3 result3 --> ", result3);
  console.log("##4 result4 --> ", result4);

  try {
    let result = await getRestaurant(task);
    if (
      result.Type &&
      (result.Type.includes("restaurant") || result.Type.includes("food"))
    ) {
      console.log("firing first if block");
      return { taskName: result.Name, taskType: result.Type[0] };
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
      return { taskName: task, taskType: "Product" };
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

module.exports = router;
