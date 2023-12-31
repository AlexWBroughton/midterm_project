// load .env data into process.env
require('dotenv').config();


// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");



const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static('public'));

app.use(
  cookieSession({
    name: "session",
    keys: require("keygrip")(["SEKRIT2", "SEKRIT1"], "sha256", "hex"),
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own


//routerGet contains all the SELECT queries for the current database.
const routerGet = require('./routes/routerGet');
const routerPost = require('./routes/routerPost');
const routerDelete = require('./routes/routerDelete');
const routerPut = require('./routes/routerPut');

app.use('/tasks', routerGet);
app.use('/tasks', routerPost);
app.use('/tasks', routerDelete);
app.use('/tasks', routerPut);


const userApiRoutes = require('./routes/users-api');
// const usersRoutes = require('./routes/users');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

app.use('/api/users', userApiRoutes);
// app.use('/api/films', filmsApiRoutes);
// app.use('/api/books', booksRouter);

// handling middleware errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).



app.get('/', (req, res) => {
  res.render('index');
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

