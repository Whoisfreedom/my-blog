var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	bindAid: Number,
	createTime: Date,
	text: String,
	name: String,
	commentId: Number
})

mongoose.model('Comment', CommentSchema);