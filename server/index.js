const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5500;

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

//리액트로부터 전달된 요청 라우터 test
// app.post('/api/send', (req, res) => {
// 	console.log(req.body);
// 	res.json({ success: true, result: req.body.name + '2' });
// });

//create
app.post('/api/create', (req, res) => {
	console.log(req.body);
	res.json({ success: true });
});
