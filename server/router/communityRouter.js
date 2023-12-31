const express = require('express');
const router = express.Router();
const { Post } = require('../model/postSchema.js');
const { Counter } = require('../model/counterSchema.js');
const { User } = require('../model/userSchema.js');

//글저장 라우터
router.post('/create', (req, res) => {
	const temp = req.body;

	//1-카운터 모델에서 communityNum을 찾은 다음에 프론트에서 받은 객체에 추가
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			temp.communityNum = doc.communityNum;
			//temp = {title, content, uid, communityNum}

			//2-User컬렉션에서 현재로그인 사용자의 uid값으로 해당 유저정보 다큐먼트 찾고
			//해당 다큐먼트의 objectId값을 writer속성에 추가
			User.findOne({ uid: temp.uid })
				.exec()
				.then((doc) => {
					temp.writer = doc._id;
					//temp = {title, content, uid, communityNum, writer}

					//3-해당 post모델의 writer 프로퍼티안에는 작성자정보의 다큐먼트가 참조된
					//참조된 모델객체를 저장하고 저장이 성공하면 카운터 컬랙션의 communityNum 값 증가
					const PostModel = new Post(temp);
					PostModel.save().then(() => {
						Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
							.exec()
							.then(() => {
								res.json({ success: true });
							})
							.catch((err) => res.json({ success: false, err: err }));
					});
				});
		});
});

//read 목록 출력 라우터
router.get('/read/:num', (req, res) => {
	Post.find()
		.populate('writer') // 오브젝트 아이디를 등록해주기
		.sort({ createdAt: -1 }) //최신글이 목록 제일 위에 뜨게하기
		.limit(req.params.num)
		.exec() //find명령어 exec(실행)
		.then((doc) => {
			console.log(doc);
			res.json({ success: true, communityList: doc });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

//상세페이지 출력 라우터
router.get('/detail/:id', (req, res) => {
	Post.findOne({ communityNum: req.params.id })
		.populate('writer')
		.exec()
		.then((doc) => {
			res.json({ success: true, detail: doc });
		})
		.catch((err) => {
			res.json({ success: false, err: err });
		});
});

//글 수정요청 라우터
router.put('/edit', (req, res) => {
	const temp = {
		title: req.body.title,
		content: req.body.content,
		// communityNum: req.body.id, 이건 바뀌는 부분이 아니기 때문에 안쓰기로
	};

	Post.updateOne({ communityNum: req.body.id }, { $set: temp })
		.exec()
		.then((doc) => {
			console.log(doc);
			res.json({ success: true });
		})
		.catch((err) => res.json({ success: false }));
});

//글 삭제요청 라우터
router.delete('/delete/:id', (req, res) => {
	Post.deleteOne({ communityNum: req.params.id })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch(() => {
			res.json({ success: false });
		});
});

module.exports = router;
