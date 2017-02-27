var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) return res.redirect('/posts');
  res.render('register', { title: 'Sign Up' });
});

router.post('/', function(req, res, next) {

  if (req.isAuthenticated()) return res.redirect('/posts');
  User.register(new User({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      return next(err);
    }
    res.render('editPost', {
      title: '',
      text: '',
      message: "Write your first post"
    });
  });
});

module.exports = router;
