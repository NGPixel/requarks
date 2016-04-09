var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('teams/teams', { navbar_active: 'teams' });
});

router.get('/create', function(req, res, next) {
  res.render('teams/create', { navbar_active: 'teams' });
});

module.exports = router;
