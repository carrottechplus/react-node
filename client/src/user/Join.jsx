import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import firebase from '../firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';

const BtnSet = styled.nav`
	margin-top: 20px;
	display: flex;
	gap: 20px;
`;
function Join() {
	const user = useSelector((store) => store.user);
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [Pwd01, setPwd01] = useState('');
	const [Pwd02, setPwd02] = useState('');
	const [Name, setName] = useState('');

	const handleJoin = async () => {
		if (!(Name && Email && Pwd01 && Pwd02)) return alert('모든 항목을 입력해주세요.');
		if (Pwd01 !== Pwd02) return alert('비밀번호 항목을 동일하게 입력해주세요.');

		//위의 조건을 통과하면 필요한 정보값을 firebase에 등록 처리 (import)
		const createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, Pwd01);
		await createdUser.user.updateProfile({ displayName: Name });
		console.log(createdUser.user);

		const item = {
			displayName: createdUser.user.multiFactor.user.displayName,
			uid: createdUser.user.multiFactor.user.uid,
		};

		axios.post('/api/user/join', item).then((res) => {
			if (res.data.success) {
				firebase.auth().signOut();
				alert('성공적으로 회원가입 되었습니다.');
				navigate('/login');
			} else return alert('회원가입에 실패했습니다.');
		});
	};

	useEffect(() => {
		if (user.uid !== '') navigate('/');
	}, [navigate, user]);

	return (
		<Layout name={'Join'}>
			<input
				type='email'
				value={Email}
				placeholder='이메일 주소를 입력하세요.'
				onChange={(e) => setEmail(e.target.value)}
			/>

			<input
				type='password'
				value={Pwd01}
				placeholder='비밀번호 입력하세요.'
				onChange={(e) => setPwd01(e.target.value)}
			/>

			<input
				type='password'
				value={Pwd02}
				placeholder='비밀번호 다시 입력하세요.'
				onChange={(e) => setPwd02(e.target.value)}
			/>

			<input type='text' value={Name} placeholder='이름을 입력하세요.' onChange={(e) => setName(e.target.value)} />
			<BtnSet>
				<button type='button' onClick={() => navigate(-1)}>
					취소하기
				</button>
				<button type='button' onClick={handleJoin}>
					회원가입 하기
				</button>
			</BtnSet>
		</Layout>
	);
}

export default Join;
