var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) return res.redirect('/posts');
  res.render('index', { title: 'Welcome' });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/posts');
});

module.exports = router;
