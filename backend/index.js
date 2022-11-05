const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
require('dotenv').config()

const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/auth');
// var usersRouter = require('./src/routes/users');

var app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const db = require("./src/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use('/', indexRouter);
app.use('/auth', authRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err)

  if (err.statusCode === 500) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  } else {
    res.status(err.statusCode);
    res.json({ error: err.message });
  }
  
});

module.exports = app;
