import { Routes, Route } from 'react-router-dom'; //react 6 버전
import Header from './common/Header';
import Main from './common/Main';
import List from './community/List';
import Create from './community/Create';
import Detail from './community/Detail';
import GlobalStyle from './GlobalStyle';
import Edit from './community/Edit';
import Join from './user/Join';
import Login from './user/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginUser, logoutUser } from './redux/userSlice';
import firebase from './firebase';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		//강제로 로그아웃 처리 메서드
		// firebase.auth().signOut();

		//컴포넌트가 마운트 되자마자 userInfo(콜백함수의 파라미터) 값이 담겨있는지 아닌지 (null) 확인
		firebase.auth().onAuthStateChanged((userInfo) => {
			// console.log(userInfo);

			if (userInfo === null) dispatch(logoutUser());
			else dispatch(loginUser(userInfo.multiFactor.user));
		});
	}, [dispatch]);

	return (
		<>
			<GlobalStyle />
			<Header />

			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/create' element={<Create />} />
				<Route path='/detail/:id' element={<Detail />} /> {/* :id : param */}
				<Route path='/edit/:id' element={<Edit />} />
				<Route path='/join' element={<Join />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	);
}

export default App;
