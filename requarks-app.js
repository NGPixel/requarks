// ===========================================
// REQUARKS
// 1.0.0
// Licensed under GPLv3
// ===========================================

var appconfig = require('./config.json');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var expressBundles = require('express-bundles');
var compression = require('compression');
var passport = require('passport');
var autoload = require('auto-load');
var _ = require('lodash');
var util = require('util');


var auth = require('./middlewares/auth');

var i18next = require('i18next');
var i18next_backend = require('i18next-node-fs-backend');
var i18next_mw = require('i18next-express-middleware');

var ctrl = autoload(__dirname + '/controllers');

app = express();
db = require("./models")(appconfig);
red = require('./modules/redis')(appconfig);
ROOTPATH = __dirname;

var _isDebug = (app.get('env') === 'development');

// ----------------------------------------
// Passport Authentication
// ----------------------------------------

var strategy = require('./passport-auth0');

app.use(cookieParser());
app.use(session({
  name: 'requarks.sid',
  store: new redisStore({ client: red }),
  secret: appconfig.sessionSecret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// ----------------------------------------
// Localization Engine Setup
// ----------------------------------------

i18next
  .use(i18next_backend)
  .use(i18next_mw.LanguageDetector)
  .init({
    load: 'languageOnly',
    ns: 'common',
    defaultNS: 'common',
    saveMissing: false,
    //debug: _isDebug,
    supportedLngs: ['en', 'fr'],
    fallbackLng : 'en',
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json'
    }
  });

// ----------------------------------------
// View Engine Setup
// ----------------------------------------

app.use(compression());

app.use(i18next_mw.handle(i18next));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
//if(_isDebug) { app.use(logger('dev')); }
app.use(bodyParser.json());
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
      'css/libs/typicons.css',
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

app.use('/', ctrl.login);
app.use(auth);

app.use('/', ctrl.dashboard);
app.use('/create', ctrl.create);
app.use('/review', ctrl.review);
app.use('/projects', ctrl.projects);
app.use('/teams', ctrl.teams);
app.use('/settings', ctrl.settings);

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
