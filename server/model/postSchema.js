const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		communityNum: Number,
		//User컬랙션에서 참조하고자 하는 document의 object_id가 등록되면
		//해당 다큐먼트의 정보값을 post에서 참조
		writer: {
			ref: 'User',
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{ collection: 'Posts', timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = { Post };
