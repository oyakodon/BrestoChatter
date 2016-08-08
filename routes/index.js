var express = require('express');
var router = express.Router();

var sessionCheck = require('../validation/sessionCheck');

/* GET home page. */
router.get('/', sessionCheck.loginCheck, function(req, res, next) {
  res.render('index', { title: 'Chat' });
});

module.exports = router;
