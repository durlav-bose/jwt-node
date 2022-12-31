const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.set("strictQuery", false);
const dbURI = 'mongodb://localhost:27017/auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("database connected"))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.listen(3000, () => {
    console.log("listening on port 3000");
})