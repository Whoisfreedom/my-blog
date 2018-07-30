var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	bindAid: Number,
	createTime: Date,
	text: String,
	name: String
})

mongoose.model('Comment', CommentSchema);