const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const pageRoute = require('./routes/pageRoute');

const app = express();

// Connecting Db
const dbUrl = 'mongodb://localhost/fithub-db'
mongoose.connect(dbUrl).then(() => {
  console.log('Db Connected succesfully');
}).catch((err) => {
  console.log(err);
}) 

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

// Routes
app.use('/', pageRoute);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sunucu port ${port} baslatildi `);
});
