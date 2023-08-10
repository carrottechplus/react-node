import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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
	const user = useSelector((store) => store.user);
	const navigate = useNavigate();
	const params = useParams();
	const [Detail, setDetail] = useState(null); //doc 하나만 가져올거니까 배열아닌 객체

	const handleDelete = () => {
		if (!window.confirm('정말 삭제하시겠습니까?')) return;
		axios.delete(`/api/community/delete/${params.id}`).then((res) => {
			if (res.data.success) {
				alert('게시글이 삭제되었습니다.');
				navigate('/list');
			} else {
				alert('게시글이 삭제되지 않았습니다.');
			}
		});
	};

	useEffect(() => {
		axios
			.get(`/api/community/detail/${params.id}`)
			.then((res) => {
				if (res.data.success) {
					setDetail(res.data.detail);
				} else {
					alert('상세글 호출에 실패했습니다.');
				}
			})
			.catch((err) => console.log(err));
	}, [params]);

	return (
		<Layout name={'Detail'}>
			<DetailWrap>
				<h2>{Detail?.title}</h2>
				<p>{Detail?.content}</p>
				<p>글작성자: {Detail?.writer.displayName}</p>
				<ul>
					<li>수정 날짜 : {Detail?.updatedAt.split('T')[0]}</li>
					<li>글 작성 날짜 : {Detail?.createdAt.split('T')[0]}</li>
				</ul>
			</DetailWrap>
			{user.uid === Detail?.writer.uid && (
				<BtnSet>
					<Link to={`/edit/${params.id}`}>Edit</Link>
					<button type='button' onClick={handleDelete}>
						Delete
					</button>
				</BtnSet>
			)}
		</Layout>
	);
}

export default Detail;
