var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	Aid: Number,
	title: String,
	innerHtml: String,
	createTime: Date,
	type: String
})

mongoose.model('Article', ArticleSchema);