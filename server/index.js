const express = require('express');
const app = express();
const path = require('path');
const port = 5500;

// express에서 client측 build 폴더까지의 경로를 static하게 지정
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('*', (req, res) => {
	// 이상한 url로 들어올경우 처리? e.g. 404 error
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
	console.log(`Server app listening port ${port}`);
});
