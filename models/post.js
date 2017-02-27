var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Post = new Schema({
  author: String,
  title: String,
  text: String,
  date: {
    type: String,
    default: Date.now()
  }
});


module.exports = mongoose.model('Post', Post);
