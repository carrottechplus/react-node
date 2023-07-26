const mongoose = require('mongoose');

// 고객 정보 저장하고, 게시글 쓴 유저를 구별하기 위함,
const userSchema = new mongoose.Schema(
	{
		displayName: String,
		uid: String,
		userNum: Number,
	},
	{ collection: 'User' }
);
const User = mongoose.model('User', userSchema);
module.exports = { User };
