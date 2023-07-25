import { useState } from 'react';
import Layout from '../common/Layout';
import firebase from '../firebase';

// 사용자 정보 받을 것 state에 담기
function Join() {
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
	};

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

			<button type='button' onClick={handleJoin}>
				회원가입 하기
			</button>
		</Layout>
	);
}

export default Join;
