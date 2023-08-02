const db = require('../connection');

// gets information from our database files.
const getTasks = () => {
  console.log('here in getTASKS');
  return db.query(
    `SELECT *
    FROM todos
    JOIN categories ON todos.category_id = categories.id
    ORDER BY todos.date_added
    LIMIT 15;`
  )
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getFilms = () => {
  console.log('here in getFILMS');
  return db.query(
    `SELECT *
    FROM todos
    JOIN categories ON todos.category_id = categories.id
    WHERE todos.category_id = 2
    ORDER BY todos.date_added
    LIMIT 15;`
  )
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getRestaurants = () => {
  return db.query(
    `SELECT *
    FROM todos
    JOIN categories ON todos.category_id = categories.id
    WHERE todos.category_id = 1
    ORDER BY todos.date_added
    LIMIT 15;`
  )
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getBooks = () => {
  return db.query(
    `SELECT *
    FROM todos
    JOIN categories ON todos.category_id = categories.id
    WHERE todos.category_id = 3
    ORDER BY todos.date_added
    LIMIT 15;`
  )
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getProducts = () => {
  return db.query(
    `SELECT *
    FROM todos
    JOIN categories ON todos.category_id = categories.id
    WHERE todos.category_id = 4
    ORDER BY todos.date_added
    LIMIT 15;`
  )
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
  };

  const deleteTask = (taskID) => {
    return db.query(
      `DELETE FROM todos
      WHERE id=$1;`,
      [taskID]
    )
      .then((result) => {
        console.log(`Task with ID ${taskID} deleted.`);
        return result.rowCount > 0; // Return true if the task was deleted successfully.
      })
      .catch((err) => {
        console.error(`Error deleting task with ID ${taskID}: ${err.message}`);
        return false; // Return false if there was an error deleting the task.
      });
  };

module.exports = { getFilms, getRestaurants, getBooks, getProducts, getTasks, deleteTask };
