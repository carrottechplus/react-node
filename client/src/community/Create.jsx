import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';

function Create() {
	const navigate = useNavigate();
	const [Ttl, setTtl] = useState('');
	const [Con, setCon] = useState('');

	const handleCreate = () => {
		const item = { title: Ttl, content: Con };
		axios
			.post('/api/community/create', item)
			.then((res) => {
				console.log(res);
				alert('글 저장에 성공했습니다.');
				navigate('/list');
				// navigate(-1); 이전페이지
			})
			.catch((err) => {
				console.log(err);
				alert('글 저장에 실패했습니다.');
			});
	};

	useEffect(() => {}, []);

	return (
		<Layout name={'Post'}>
			<label htmlFor='ttl'>title</label>
			<br />
			<input type='text' id='ttl' value={Ttl} onChange={(e) => setTtl(e.target.value)} />
			<br />
			<label htmlFor='con'>Content</label>
			<br />
			<textarea name='con' id='con' cols='30' rows='3' value={Con} onChange={(e) => setCon(e.target.value)}></textarea>
			<br />
			<button type='button' onClick={handleCreate}>
				Send
			</button>
		</Layout>
	);
}

export default Create;
