import axios from 'axios';
import { useEffect } from 'react';

function App() {
	const item = { name: 'John' };

	useEffect(() => {
		axios
			.post('/api/send', item)
			.then((res) => {
				// 서버쪽에서 응답이 성공적으로 넘어오면 ㅐㅎ당 값을 콘솖문으로 출력
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return <h1>Hello3</h1>;
}

export default App;
