import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import axios from 'axios';

function List() {
	const [Posts, setPosts] = useState([]);

	useEffect(() => {
		axios.post('/api/read').then((res) => {
			console.log(res);
			setPosts(res.data.communityList);
		});
		// .catch((res) => {
		// 	console.log(res);
		// });
	}, []);
	return (
		<Layout name={'List'}>
			{Posts.map((post) => {
				return (
					<article key={post._id}>
						<h2>{post.title}</h2>
					</article>
				);
			})}
		</Layout>
	);
}

export default List;
