var mongoose = require('mongoose');

module.exports = function(){
  var db = mongoose.connect("mongodb://localhost:27017/test", {"useNewUrlParser": true});

  require('../models/user.server.model.js');
  require('../models/article.server.model.js');
  return db;
};