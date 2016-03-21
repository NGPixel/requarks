// ===========================================
// REQUARKS - SETUP
// 1.0.0
// Licensed under GPLv3
// ===========================================

var appconfig = require('./config.json');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var expressBundles = require('express-bundles');
var compression = require('compression');

var ctrlSetup = require('./controllers/setup');

app = express();

var _isDebug = (app.get('env') === 'development');

// ----------------------------------------
// View Engine Setup
// ----------------------------------------

app.use(compression());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
if(_isDebug) { app.use(logger('dev')); }
app.use(bodyParser.urlencoded({ extended: false }));

// ----------------------------------------
// Assets
// ----------------------------------------

app.use(sass({
  src: path.join(__dirname, 'client'),
  dest: path.join(__dirname, 'assets'),
  outputStyle: 'compressed',
  debug: _isDebug
}));
app.use(expressBundles.middleware({
  env: app.get('env'),
  src: path.join(__dirname, 'assets'),
  bundles: {
    'css/bundle.css': [
      'css/libs/normalize.css',
      'css/libs/flexboxgrid.css',
      'css/style.css'
    ],
    'js/bundle.js': [
      'js/libs/modernizr-custom.min.js',
      'js/libs/jquery.min.js',
      'js/libs/typeahead.bundle.min.js',
      _isDebug ? 'js/libs/vue.js' : 'js/libs/vue.min.js',
      'js/app.js'
    ]
  }
}));
app.use(express.static(path.join(__dirname, 'assets')));

// ----------------------------------------
// Disable IE compatibility mode
// ----------------------------------------

app.use(function(req, res, next) {
  res.setHeader('X-UA-Compatible','IE=edge');
  return next();
});

// ----------------------------------------
// Expose Application Configs
// ----------------------------------------

app.locals.appconfig = appconfig;
app.locals.appdata = require('./data.json');

// ----------------------------------------
// Controllers
// ----------------------------------------

app.use('/', ctrlSetup);

// ----------------------------------------
// Error handling
// ----------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: _isDebug ? err : {}
  });
});

// ----------------------------------------

module.exports = app;
