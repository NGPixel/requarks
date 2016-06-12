// ===========================================
// REQUARKS
// 1.0.0
// Licensed under GPLv3
// ===========================================

var appconfig = require('./config.json');

// Load node modules

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var expressBundles = require('express-bundles');
var flash = require('connect-flash');
var compression = require('compression');
var passport = require('passport');
var autoload = require('auto-load');
var expressValidator = require('express-validator');

var i18next_backend = require('i18next-node-fs-backend');
var i18next_mw = require('i18next-express-middleware');

// Load app middlewares

var mw = autoload(path.join(__dirname, '/middlewares'));
var ctrl = autoload(path.join(__dirname, '/controllers'));
var validators = autoload(path.join(__dirname, '/modules/validators'));

// Load app modules

app = express();
db = require("./models")(appconfig);
red = require('./modules/redis')(appconfig);
lang = require('i18next');
UserData = require('./modules/auth');
RqError = autoload(path.join(__dirname, '/modules/errors'));

ROOTPATH = __dirname;
var _isDebug = (app.get('env') === 'development');

// ----------------------------------------
// Security
// ----------------------------------------

app.use(mw.security);

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
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// ----------------------------------------
// Localization Engine
// ----------------------------------------

lang
  .use(i18next_backend)
  .use(i18next_mw.LanguageDetector)
  .init({
    load: 'languageOnly',
    ns: ['common', 'dashboard', 'create', 'projects', 'teams', 'settings'],
    defaultNS: 'common',
    saveMissing: _isDebug,
    //debug: _isDebug,
    supportedLngs: ['en', 'fr'],
    preload: ['en', 'fr'],
    fallbackLng : 'en',
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json'
    }
  });

// ----------------------------------------
// View Engine Setup
// ----------------------------------------

app.use(compression());

app.use(i18next_mw.handle(lang));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator({
  customValidators: validators
}));
//app.locals.pretty = true;

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
      'css/libs/fontawesome.css',
      'css/libs/medium-editor.min.css',
      'css/libs/medium-beagle.min.css',
      'css/style.css'
    ],
    'js/bundle.js': [
      'js/libs/modernizr-custom.min.js',
      'js/libs/lodash.min.js',
      'js/libs/jquery.min.js',
      _isDebug ? 'js/libs/bluebird.js' : 'js/libs/bluebird.min.js',
      'js/libs/moment.min.js',
      'js/libs/typeahead.bundle.min.js',
      'js/libs/medium-editor.min.js',
      'js/libs/medium-autolist.min.js',
      _isDebug ? 'js/libs/me-markdown.standalone.js' : 'js/libs/me-markdown.standalone.min.js',
      _isDebug ? 'js/libs/vue.js' : 'js/libs/vue.min.js',
      _isDebug ? 'js/libs/dropzone.js' : 'js/libs/dropzone.min.js',
      _isDebug ? 'js/libs/clusterize.js' : 'js/libs/clusterize.min.js',
      'js/libs/pikaday.min.js',
      'js/libs/faker.js', // REMOVE BEFORE RELEASE
      'js/components.js',
      'js/app.js'
    ]
  }
}));
app.use(express.static(path.join(__dirname, 'assets')));

// ----------------------------------------
// Expose Application Configs
// ----------------------------------------

app.locals._ = require('lodash');
app.locals.md = require('jstransformer')(require('jstransformer-markdown-it'));
app.locals.appconfig = appconfig;
app.locals.appdata = require('./data.json');
app.use(mw.flash);

// ----------------------------------------
// Controllers
// ----------------------------------------

app.use('/', ctrl.login);

app.use('/', mw.auth, ctrl.dashboard);
app.use('/create', mw.auth, ctrl.create);
app.use('/item', mw.auth, ctrl.item);
app.use('/review', mw.auth, ctrl.review);
app.use('/projects', mw.auth, ctrl.projects);
app.use('/teams', mw.auth, ctrl.teams);
app.use('/settings', mw.auth, ctrl.settings);

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
