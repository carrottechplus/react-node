const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5500;
const { Post } = require('./model/postSchema.js');
const { Counter } = require('./model/counterSchema.js');

//클라이언트로 부터 보내진 데이터를 전달받도록 설정 (body-parser) json으로 다시 패치해서 받는거
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express에서 react안쪽 build폴더까지의 경로를 static으로 지정
app.use(express.static(path.join(__dirname, '../client/build')));

app.listen(port, () => {
	mongoose
		.connect('mongodb+srv://eunseo:!abcd1234@cluster0.b3wth7i.mongodb.net/')
		//접속 성공시
		.then(() => console.log(`Server app listening on port ${port} with MongoDB`))
		//접속 실패시
		.catch((err) => console.log(err));
});

app.get('/', (req, res) => {
	//서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//어떤 URL에서 접속하더라도 화면이 뜨도록 설정
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//create
// app.post('/api/create', (req, res) => {
// 	// PostSchema가 적용된 Post 모델 생성자를 통해 저장 모델 인스턴스 생성
// 	console.log(req.body);

// 	const PostModel = new Post({
// 		title: req.body.title,
// 		content: req.body.content,
// 	});

// 	// 생성된 모델 인스턴스로부터 save 명령어로 DB 저장 (promise)
// 	PostModel.save()
// 		.then(() => res.json({ success: true }))
// 		.catch(() => res.json({ success: false }));
// });

app.post('/api/create', (req, res) => {
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			const PostModel = new Post({
				title: req.body.title,
				content: req.body.content,
				communityNum: doc.communityNum,
			});

			PostModel.save().then(() => {
				//update : $inc(증가), $dec(감소), $set(새로운 값으로 변경) -> 여기선 inc
				Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
					.then(() => {
						// 카운터값까지 업데이트 된 후에야
						res.json({ success: true });
					})
					.catch(() => res.json({ success: false }));
			});
		});
});

//read
app.post('/api/read', (req, res) => {
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
