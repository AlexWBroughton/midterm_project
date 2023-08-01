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

module.exports = { getFilms, getRestaurants, getBooks, getProducts, getTasks };
