var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('create', { navbar_active: 'create', page_script: 'create' });
});

router.get('/:id', function(req, res, next) {
  res.render('create-form', { navbar_active: 'create', page_script: 'create' });
});

module.exports = router;
