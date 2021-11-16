const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const cors = require("cors");

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const tests = require('./routes/api/tests');

const db = require('./config/keys').mongoURI;

const app = express();
app.use(cors())

app.use(passport.initialize());

require('./config/passport')(passport);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

//Use Routes

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/tests', tests);


//server settings
const hostname = '127.0.0.1';
const port = 5000;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
