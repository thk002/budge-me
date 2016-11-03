var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/* GET social page. */
router.get('/social', function(req, res, next) {
  res.render('social');
});
/* GET budget page. */
router.get('/budget', function(req, res, next) {
  res.render('budget');
});
/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});
/* GET setting page. */
router.get('/settings', function(req, res, next) {
  res.render('settings');
});
/* GET TBD page. */
router.get('/TBD', function(req, res, next) {
  res.render('TBD');
});

module.exports = router;
