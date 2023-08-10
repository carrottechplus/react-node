import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Item = styled.article`
	width: 100%;
	background: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
	margin-bottom: 50px;
	a {
		display: inline-block;
		width: 100%;
		padding: 30px 40px;
	}
`;

function List() {
	const [Posts, setPosts] = useState([]);

	useEffect(() => {
		axios.get('/api/community/read/0').then((res) => {
			//read뒤에 0 자르지않고 다 가져온다는
			// console.log(res);
			setPosts(res.data.communityList);
		});
	}, []);
	return (
		<Layout name={'List'}>
			{Posts.map((post) => {
				return (
					<Item key={post._id}>
						<h2>
							<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
						</h2>
						<p>작성자: {post.writer.displayName}</p>

						<ul>
							<li>수정 날짜 : {post.updatedAt.split('T')[0]}</li>
							<li>글 작성 날짜 : {post.createdAt.split('T')[0]}</li>
						</ul>
					</Item>
				);
			})}
		</Layout>
	);
}

export default List;
