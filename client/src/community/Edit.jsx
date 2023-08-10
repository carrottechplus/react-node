import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../common/Layout';
import { useSelector } from 'react-redux';

// 글 수정 흐름
/*
1. Edit 컴포넌트 접속하자마자 글 고유번호에 해당하느 ㄴ데이터를 서버로 부터 전달받음.
2. 전달받은 데이터를 각각 제목, 본문 State에 옮겨담아서 폼요소안에 출력
3. 폼 안에 있는 값을 변경 후 Update버튼 클릭시 해당 데이터 값을 하나의 객체로 묶어서 서버쪽에 전달
4. 서버쪽에서는 해당 body-parser객체를 받아서 updateOne메서드로 데이터 수정 ($set방식)
5. 수정이 완료되면 프론트쪽에 성공 메세지 전달
 */

function Edit() {
	const user = useSelector((store) => store.user);
	const navigate = useNavigate();
	const params = useParams();
	const [Title, setTitle] = useState('');
	const [Content, setContent] = useState('');
	const [Detail, setDetail] = useState({});

	const handleUpdate = () => {
		if (Title.trim() === '' || Content.trim() === '') return alert('모든 항목을 입력하세요.');

		const item = {
			title: Title,
			content: Content,
			id: params.id,
		};

		axios.put('/api/community/edit', item).then((res) => {
			if (res.data.success) {
				alert('글 수정이 완료 되었습니다.');
				navigate(-1);
			} else {
				alert('글 수정에 실패하였습니다.');
			}
		});
	};

	useEffect(() => {
		if (user.uid === '') navigate('/');
		axios
			.get(`/api/community/detail/${params.id}`)
			.then((res) => {
				if (res.data.success) {
					setDetail(res.data.detail);
				}
			})
			.catch((err) => console.log(err));
	}, [navigate, user, params]);

	useEffect(() => {
		setTitle(Detail.title);
		setContent(Detail.content);
	}, [Detail]);

	return (
		<Layout name={'Post'}>
			<label htmlFor='ttl'>Title</label>
			<input type='text' id='ttl' value={Title || ''} onChange={(e) => setTitle(e.target.value)} />
			<br />
			<label htmlFor='con'>Content</label>
			<textarea
				id='con'
				cols='30'
				rows='3'
				value={Content || ''}
				onChange={(e) => setContent(e.target.value)}
			></textarea>
			<br />
			<button onClick={handleUpdate}>Update</button>
		</Layout>
	);
}

export default Edit;
