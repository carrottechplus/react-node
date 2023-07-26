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

// crud 여러군데 생길 수 있어서 각각의 폴더로 나눔
// 커뮤니티 전용 라우터
app.use('/api/community', require('./router/communityRouter.js'));

// 유저 정보 전용 라우터
app.use('/api/user', require('./router/userRouter.js'));

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
