const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		communityNum: Number,
		userNum: Number, //user정보값을 post 다큐먼트에서 참조하기 위해 userNum항목 postSchema에 추가
	},
	{ collection: 'Posts' }
);

// 게시글 스키마구조가 적용된 모델 생성자 함수를 만든 뒤 export
const Post = mongoose.model('Post', postSchema);
module.exports = { Post };
