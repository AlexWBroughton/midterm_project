/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  let userId = req.session.userId;
  // if the session doesn't have userId then user has to login again
  if (userId <= 0) {
    return res.status(401).send("Login required");
  }

  return userQueries.getUserById(userId)
    .then((users) => {
      if (users.length === 0) {
        return res.status(404).send("Cannot find user");
      }
      console.log('users ', users);
      let user = users[0];
      return res.send({
        name: user.name,
        email: user.email,
        imageUrl: user.image_url
      });
    }).catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});


router.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const imageUrl = req.body.image_url;

  // // if email or password are empty in the request
  if (!email || !password) {
    return res.status(400).send('Email or Password cannot be empty');
  }
  userQueries.getUsersByEmail(email)
    .then((users) => {
      if (users.length > 0) {
        return res.status(400).send("Failed to register user");
      }

      // users is empty - therefore we can add the user
      userQueries.createUser(email, password, name, imageUrl)
        .then((users) => {
          return res.status(201).send();
        }).catch((err) =>{
          return res.status(500).json({ error: err.message });
        });

    }).catch((err) =>{
      return res.status(500).json({ error: err.message });
    });

});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send("No Email and/or Password Were Provided");
  }

  userQueries.loginUser(email, password)
    .then((users) => {
      // check if user exists
      if (users.length === 0) {
        return res.status(401).send('Login Failed: incorrect email or password');
      }
      let user = users[0];
      req.session.userId = user.id;
      return res.send({id : user.id});
    }).catch((err) =>{
      return res.status(500).json({ error: err.message });
    });

});

router.post('/', (req, res) => {
  let userId = req.session.userId;
  const nameUpdate = req.body.nameUpdate;
  console.log(nameUpdate);
  // if the session doesn't have userId then user has to login again
  if (userId <= 0) {
    return res.status(401).send("Login required");
  }
  userQueries.updateUserById(nameUpdate, userId)
    .then(() => {
      return res.send({id: userId});
    }).catch((err) =>{
      return res.status(500).json({ error: err.message });
    });
});


module.exports = router;
