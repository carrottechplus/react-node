/* 
table 형식의 DB : SQL이라는 표준 문법을 통해 데이터 입출력
- Oracle, MySQL, MsSQL, MariaDB

json 형식의 NoSQL DB : SQL 표준 문법이 아닌 자스 구문으로 데이터 입출력
- MongoDB

Model : DB에 저장되는 데이터 객체
Schema : 데이터베이스에 저장될 자료형식이나 키 값을 강제하는 시스템적인 틀 
*/

const mongoose = require('mongoose');

// 게시글 객체가 저장될 스키마 구조를 생성
const postSchema = new mongoose.Schema({
	// 만들고싶은 구조로 만들면 됨.

	title: String,
	content: String,
});

// 게시글 스키마구조가 적용된 모델 생성자 함수를 만든 뒤 export
const Post = mongoose.model('Post', postSchema);
module.exports = { Post };
