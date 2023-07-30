const db = require('../connection');

const getFilms = () => {
  return db.query('SELECT * FROM films;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFilms };
