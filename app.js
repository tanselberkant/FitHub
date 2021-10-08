const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const pageRoute = require('./routes/pageRoute');
const userRoute = require('./routes/userRoute');
const logger = require('./logger');

const app = express();

// Connecting Db
const dbUrl = 'mongodb://localhost/fithub-db';
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('Db Connected succesfully');    
  })
  .catch((err) => {
    console.log(err);    
  });

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: 'my_dumbell_5kg',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: dbUrl,
    }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

// Routes
app.use('/', pageRoute);
app.use('/users', userRoute);

const port = process.env.PORT || 3000;

// logger.error('error');
// logger.warn('wanr'),
// logger.info('info'),
app.listen(port, () => {
  logger.info(`App is running in ${port}`)
}) 

// app.listen(port, () => {
//   console.log(`Sunucu port ${port} baslatildi `);
// });