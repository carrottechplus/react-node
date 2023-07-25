const express = require('express');
const router = express.Router();
const { Post } = require('../model/postSchema.js');
const { Counter } = require('../model/counterSchema.js');

//create 글 저장 라우터
router.post('/create', (req, res) => {
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			const PostModel = new Post({
				title: req.body.title,
				content: req.body.content,
				communityNum: doc.communityNum,
			});

			PostModel.save().then(() => {
				//update :
				// $inc(증가), $dec(감소), $set(새로운 값으로 변경) -> 여기선 inc
				Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
					.then(() => {
						// 카운터값까지 업데이트 된 후에야
						res.json({ success: true });
					})
					.catch(() => res.json({ success: false }));
			});
		});
});

//read 목록 출력 라우터
router.get('/read', (req, res) => {
	Post.find()
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
router.post('/detail', (req, res) => {
	Post.findOne({ communityNum: req.body.id })
		.exec()
		.then((doc) => {
			res.json({ success: true, detail: doc });
		})
		.catch((err) => {
			res.json({ success: false, err: err });
		});
});

//글 수정요청 라우터
router.post('/edit', (req, res) => {
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
router.post('/delete', (req, res) => {
	Post.deleteOne({ communityNum: req.body.id })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch(() => {
			res.json({ success: false });
		});
});

module.exports = router;
