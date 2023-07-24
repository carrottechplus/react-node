import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../common/Layout';

// 글 수정 흐름
/*
1. Edit 컴포넌트 접속하자마자 글 고유번호에 해당하느 ㄴ데이터를 서버로 부터 전달받음.
2. 전달받은 데이터를 각각 제목, 본문 State에 옮겨담아서 폼요소안에 출력
3. 폼 안에 있는 값을 변경 후 Update버튼 클릭시 해당 데이터 값을 하나의 객체로 묶어서 서버쪽에 전달
4. 서버쪽에서는 해당 body-parser객체를 받아서 updateOne메서드로 데이터 수정 ($set방식)
5. 수정이 완료되면 프론트쪽에 성공 메세지 전달
 */

function Edit() {
	const params = useParams();
	const [Title, setTitle] = useState('');
	const [Content, setContent] = useState('');

	useEffect(() => {
		axios
			.post('/api/community/detail', params)
			.then((res) => {
				if (res.data.success) {
					console.log(res.data.detail);
					setTitle(res.data.detail.title);
					setContent(res.data.detail.content);
				} else {
					alert('fail');
				}
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Layout name={'Post'}>
			<label htmlFor='ttl'>Title</label>
			<input type='text' id='ttl' value={Title} onChange={(e) => setTitle(e.target.value)} />
			<br />
			<label htmlFor='con'>Content</label>
			<textarea id='con' cols='30' rows='3' value={Content} onChange={(e) => setContent(e.target.value)}></textarea>
			<br />
			<button>Update</button>
		</Layout>
	);
}

export default Edit;
