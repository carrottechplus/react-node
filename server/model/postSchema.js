const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		communityNum: Number,
	},
	{ collection: 'Posts' }
);

// 게시글 스키마구조가 적용된 모델 생성자 함수를 만든 뒤 export
const Post = mongoose.model('Post', postSchema);
module.exports = { Post };
