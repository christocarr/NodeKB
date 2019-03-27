const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodekb', {useNewUrlParser: true});
let db = mongoose.connection;

//check connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//check for DB errors
db.on('error', () => {
  console.log(err);
});

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});