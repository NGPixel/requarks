var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var expressBundles = require('express-bundles');
var compression = require('compression');
var i18next = require('i18next');
var i18next_backend = require('i18next-node-fs-backend');
var i18next_mw = require('i18next-express-middleware');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(compression());

// localization engine setup
i18next
  .use(i18next_backend)
  .use(i18next_mw.LanguageDetector)
  .init({
    ns: 'common',
    defaultNS: 'common',
    saveMissing: false,
    debug: true,
    fallbackLng : 'en',
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json'
    }
  });

// view engine setup
app.use(i18next_mw.handle(i18next));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Assets

app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  outputStyle: 'compressed',
  debug: true
}));
app.use(expressBundles.middleware({
  env: app.get('env'),
  src: path.join(__dirname, 'public'),
  bundles: {
    'css/bundle.css': [
      'css/normalize.css',
      'css/style.css'
    ],
    'js/bundle.js': [
      'js/modernizr-custom.min.js'
    ]
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

// Disable IE compatibility mode

app.use(function(req, res, next) {
  res.setHeader('X-UA-Compatible','IE=edge');
  return next();
});

// Routes

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
