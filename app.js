const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const jsonPath = require('jsonpath');
const environment = require('./environment/environment');
const dc_handler = require('./public/javascripts/notificationHandler/wdc-notificationHandler');
const dc_subscription = require('./public/javascripts/wdc/wdc-subscription');
// const orion_subscription = require('./public/javascripts/fiware/orion-subscription');
// const mobius_subscription = require('./public/javascripts/mobius/mobius-subscription');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

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
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



/**
 1. open the environment/listening file 
 2. check if the subscription exists 
  a. if exist move to the next in the list
  b. if does not exist then subscribe the entry

**/

fs.readFile('environment/listening-list.json', (err, data) => {
  if (err)
    throw err;
  let listening = JSON.parse(data);
  let dc_list = jsonPath.value(listening, '$..dc_listening');
  let orion_list = jsonPath.value(listening, '$..orion_listening');
  let mobius_list = jsonPath.value(listening, '$..mobius_listening');
  dc_list.forEach(element => {
    dc_subscription.subscribe(element, (msg) => {
      /**
       case1. created a new subscription
              -->move to next element
       case2. subscription already exist
              -->move to next element
       case3. error
              -->log the error in subscription error log
              -->move to the next element  
       **/
      console.log("sub return msg");
    });
  });
  orion_list.forEach(element => {

  });
  mobius_list.forEach(element => {

  });
});

console.log("came out of the read file !!");
/**
 ~~~~~~~~~~~~~~~~~~todo~~~~~~~~~~~~~~~~
      subscribe only the newest entry  
**/

dc_handler.notificationHandler();//todo: consoling part



module.exports = app;
