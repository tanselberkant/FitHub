const express = require('express');
const ejs = require('ejs');
const pageRoute = require('./routes/pageRoute');

const app = express();

// Connecting Db

// TEMPLATE ENGINE

app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

// Routes
app.use('/', pageRoute);


// app.get('/', (req, res) => {
//   res.status(200).render('index');
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sunucu port ${port} baslatildi `);
});
