const db = require('../connection');

const getUsersByEmail = (email) => {
  // console.log('here in getTASKS');
  return db.query(
    `SELECT * FROM USERS
    WHERE USERS.email = $1`, [email]
  )
    .then((data) => {
      // console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const createUser = (email, password, name, imageUrl) => {

  return db.query(
    `INSERT INTO USERS (email, password, name, image_url)
    VALUES ($1, $2, $3, $4)`, [email, password, name, imageUrl]
  )
    .then((data) => {
      // console.log(data);
      return data.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const loginUser = (email, password) => {
  return db.query(
    `SELECT * FROM USERS
    WHERE users.email = $1 AND
    users.password = $2`, [email, password]
  )
    .then((data) => {
    // console.log(data);
      return data.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getUserById = (id) => {
  return db.query(`SELECT * FROM USERS WHERE id = $1`, [id])
    .then((data) => {
      return data.rows;
    }).catch((err) => {
      console.error(err.message);
    });
};

const updateUserById = (nameUpdate, id) => {
  return db.query(
    `UPDATE users
  SET name = $1
  WHERE id = $2;`, [nameUpdate, id])
    .then((data) => {
      console.log(data);
      return data.rows;
    }).catch((err) => {
      console.error(err.message);
    });
};

module.exports = {getUsersByEmail, createUser, loginUser, getUserById, updateUserById};
