import { useState } from 'react';
import Layout from '../common/Layout';
import firebase from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
	// console.log(useSelector((store) => store));
	const [Email, setEmail] = useState('');
	const [Pwd, setPwd] = useState('');
	const [Err, setErr] = useState('');
	const navigate = useNavigate();

	const handleLogin = async () => {
		if (!(Email || Pwd)) return alert('모든 항목을 입력해주세요.');

		try {
			await firebase.auth().signInWithEmailAndPassword(Email, Pwd);
			navigate(-1);
		} catch (err) {
			console.log(err.code);
			// 이메일 계정 잘못 입력했을 때 콘솔 : auth/user-not-found
			// 이메일 계정은 제대로 입력 하고 비번을 잘못 입력했을 때 콘솔 : auth/wrong-password

			if (err.code === 'auth/user-not-found') setErr('존재하지 않는 이메일주소 입니다.');
			else if (err.code === 'auth/wrong-password') setErr('비밀번호가 일치하지 않습니다.');
			else if (err.code === 'auth/invalid-email') setErr('이메일 주소를 정확히 입력해 주세요.');
			else if (err.code === 'auth/missing-password') setErr('비밀번호를 입력해 주세요.');
			else setErr('로그인에 실패했습니다.');
		}
	};

	return (
		<Layout name={'Login'}>
			<label htmlFor='email'>이메일 주소</label>
			<input
				type='email'
				id='email'
				value={Email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder='이메일 주소를 입력하세요.'
			/>
			<label htmlFor='pwd'>비밀번호</label>
			<input
				type='password'
				id='pwd'
				value={Pwd}
				onChange={(e) => setPwd(e.target.value)}
				placeholder='비밀번호를 입력하세요.'
			/>
			<nav>
				<button type='button' onClick={handleLogin}>
					로그인 하기
				</button>
				<button type='button' onClick={() => navigate('/join')}>
					회원가입 하기
				</button>
			</nav>
			{Err !== '' && <p>{Err}</p>}
		</Layout>
	);
}

export default Login;
