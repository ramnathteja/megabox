const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jsPath = require('jsonpath')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//two part subscripton
//check the whole list at the point of subscription

/**
 1. open the environment file 
 2. check if the subscription exists 
  a. if exist move to the next in the list
  b. if does not exist then subscribe the entry

**/

//subscribe only the newest entry  

//~~~~~~~~~~~~~~~~~~todo~~~~~~~~~~~~~~~~


//todo list of subscription resources
//go through each list of json files
//then call the subcription check or subscription create
//listen to all subscriptions 


module.exports = app;
