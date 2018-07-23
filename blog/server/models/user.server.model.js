var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	uid: String,
	userName: String,
	createTime: Date,
	lastLogin:Date,
	passWord: String
})

mongoose.model('User', UserSchema);