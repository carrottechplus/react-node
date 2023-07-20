import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Create() {
	const [Ttl, setTtl] = useState('');
	const [Con, setCon] = useState('');

	const handleCreate = () => {
		const item = { title: Ttl, content: Con };
		axios
			.post('/api/create', item)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
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
			<button onClick={handleCreate} type='button'>
				Send
			</button>
		</Layout>
	);
}

export default Create;
