const db = require('../connection');

const getFilms = () => {
  console.log('here in getFILMS');
  return db.query(`SELECT *
  FROM films;`)
  .then(data => {
    console.log(data.rows);
    return data.rows;
  }).catch((err) => {
    console.log(err.message);
  });
};

const getRestaurants = () => {
  return db.query(`SELECT *
  FROM restaurants;`)
  .then(data => {
    console.log(data.rows);
    return data.rows;
  }).catch((err) => {
    console.log(err.message);
  });
};

const getBooks = () => {
  return db.query(`SELECT *
  FROM books;`)
  .then(data => {
    console.log(data.rows);
    return data.rows;
  }).catch((err) => {
    console.log(err.message);
  });
};

const getProducts = () => {
  return db.query(`SELECT *
  FROM products;`)
  .then(data => {
    console.log(data.rows);
    return data.rows;
  }).catch((err) => {
    console.log(err.message);
  });
};

module.exports = { getFilms, getRestaurants, getBooks, getProducts };
