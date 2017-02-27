var express = require('express');
var router = express.Router();
var passport = require('passport');

var Post = require('../models/post');
var User = require('../models/user');

router.get('/:authorName', function(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect('/');
  var authorName = req.params.authorName;
  if (authorName) {
    User.findOne({
      username: authorName
    }, function(err, user) {
      Post.find({
        author: authorName
      }, function(err, posts) {
        if (err) return next();
        res.render('posts', {
          authorName: authorName,
          posts: posts
        });
      })
    })
  } else {


  }
});


router.get('/', function(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect('/');
  Post.find({
    author: req.user.username
  }, function(err, posts) {
    if (err) return next();
    res.render('posts', {
      authorName: 'you',
      posts: posts
    });
  })
});

router.post('/search', function(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect('/');
  Post.find({
    title: new RegExp(req.body.query, 'i')
  }, function(err, posts) {
    if (err) return next();
    console.log(posts);
    res.render('searchResults', {
      results: posts,
      query: req.body.query
    });
  })
});

module.exports = router;
