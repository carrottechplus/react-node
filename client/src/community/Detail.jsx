import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const DetailWrap = styled.div`
	width: 100%;
	padding: 40px;
	background: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
`;

const BtnSet = styled.nav`
	display: flex;
	gap: 20px;
	margin-top: 20px;
	a {
		display: inline-block;
		padding: 5px 20px;
		background: rgb(85, 85, 85);
		color: rgb(255, 255, 255);
		border: none;
		cursor: pointer;
	}
`;

function Detail() {
	const params = useParams();
	const [Detail, setDetail] = useState(null); //doc 하나만 가져올거니까 배열아닌 객체

	useEffect(() => {
		axios
			.post('/api/community/detail', params)
			.then((res) => {
				if (res.data.success) {
					setDetail(res.data.detail);
				} else {
					alert('상세글 호출에 실패했습니다.');
				}
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Layout name={'Detail'}>
			<DetailWrap>
				<h2>{Detail?.title}</h2>
				<p>{Detail?.content}</p>
			</DetailWrap>
			<BtnSet>
				<div>
					<Link to={`/edit/${params.id}`}>Edit</Link>
				</div>
				<div>
					<Link>Delete</Link>
				</div>
			</BtnSet>
		</Layout>
	);
}

export default Detail;
