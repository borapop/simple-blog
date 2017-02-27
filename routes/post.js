var express = require('express');
var router = express.Router();
var Post = require('../models/post');

router.get('/id/:postId', function(req, res, next) {
  var postId = req.params.postId;
  if (postId) {
    Post.findOne({
      _id: postId
    }, function(err, post) {
      if (err) {
        next()
      } else {
        if (post.author == req.user.username) {
          var date = new Date(parseInt(post.date));
          res.render('post', {
            title: post.title,
            text: post.text,
            date: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() ,
            author: post.author,
            postId: post._id
          });
        } else {
          var date = new Date(parseInt(post.date));
          res.render('post', {
            title: post.title,
            text: post.text,
            date: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() ,
            author: post.author
          });
        }
      }
    })
  } else {
    return next();
  }
});

router.get('/edit/:postId', function(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect('/');
  var postId = req.params.postId;
  if (postId) {
    Post.findOne({
      _id: postId
    },
    function(err, post) {
      if (err) {
        next();
      } else {
        res.render('editPost', {
          title: post.title,
          text: post.text,
          postId: post._id
        });
      }
    });
  } else {
    return res.redirect('/posts');
  }
});

router.post('/delete/:postId', function(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect('/');
  var postId = req.params.postId;
  if (postId) {
    Post.remove({
      _id: postId,
      author: req.user.username
    },
    function(err, post) {
      if (err) {
        next();
      } else {
        return res.redirect('/posts');
      }
    });
  } else {
    return res.redirect('/posts');
  }
});

router.get('/new', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('editPost', {
      title: '',
      text: '',
    })
  }
});

router.post('/new', function(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect('/');
  console.log(req.body);
  var title = req.body.title;
  var text = req.body.text;
  if (title && text) {
    var post = new Post({
      title: title,
      text: text,
      author: req.user.username
    });
    post.save(function(err, post) {
      if (err) {
        next();
      } else {
        res.redirect('/post/id/' + post._id);
      }
    });
  } else {
    res.render('editPost', {
      title: '',
      text: '',
    })
  }
});

router.post('/edit/:postId', function(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect('/');
  var postId = req.params.postId;
  var title = req.body.title;
  var text = req.body.text;
  if (title && text) {
    Post.update({
        _id: postId,
        author: req.user.username
      },
      {
        title: title,
        text: text,
      },
      function(err, post) {
        if (err) {
          next();
        } else {
          res.redirect('/post/id/' + postId);
        }
    });
  } else {
    if (postId) return res.redirect('/post/edit/' + postId);
    return res.redirect('/posts');
  }
});

module.exports = router;
