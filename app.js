const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

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

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

let Article = require('./models/articles');

//index route
app.get('/', (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Articles',
        articles: articles
      });
    }
  });
});

//add article route
app.get('/articles/add', (req, res) => {
  res.render('add', {
    title: 'Add Article'
  });
});

//add post route
app.post('/articles/add', (req, res) => {
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save((err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

//get article route
app.get('/:id', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    res.render('show', {
      article:article
    });
  });
});

//edit article route
app.get('/edit/:id', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    res.render('edit', {
      article:article
    });
  });
});

//update article
app.post('/articles/edit/:id', (req, res) => {
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = {_id:req.params.id}

  Article.update(query, article, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});