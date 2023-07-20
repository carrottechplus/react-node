import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
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
		<section>
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
		</section>
	);
}

export default App;

/* 
CRUD
create (저장)
read   (읽기)
update (수정)
delete (삭제)
*/
