import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import firebase from '../firebase';

const HeaderWrap = styled.header`
	width: 350px;
	height: 100vh;
	background: #222;
	position: fixed;
	top: 0;
	left: 0;
	padding: 50px;
`;
const Logo = styled.h1`
	margin-bottom: 40px;
	a {
		font: 40px/1 'arial';
		color: #fff;
	}
`;
const Gnb = styled.ul`
	a {
		display: block;
		padding: 10px;
		font: bold 16px/1 'arial';
		color: #bbb;
	}
`;
const Util = styled.ul`
	position: absolute;
	bottom: 50px;
	left: 50px;
	display: flex;
	gap: 10px;
	a {
		padding: 10px;
		font: 14px/1 'arial';
		color: #777;
	}
`;

function Header() {
	const activeStyle = { color: 'orange' };
	const user = useSelector((store) => store.user);
	console.log(user);

	return (
		<HeaderWrap>
			<Logo>
				<Link to='/'>LOGO</Link>
			</Logo>
			<Gnb>
				<li>
					<NavLink to='/list' style={(props) => (props.isActive ? activeStyle : null)}>
						Show List
					</NavLink>
				</li>
				{user.uid !== '' && (
					<li>
						<NavLink to='/create' style={(props) => (props.isActive ? activeStyle : null)}>
							Write Post
						</NavLink>
					</li>
				)}
			</Gnb>

			<Util>
				{user.uid === '' ? (
					// 로그아웃 상태
					<>
						<li>
							<NavLink to='/login' style={(props) => (props.isActive ? activeStyle : null)}>
								Login
							</NavLink>
						</li>
						<li>
							<NavLink to='/join' style={(props) => (props.isActive ? activeStyle : null)}>
								Join
							</NavLink>
						</li>
					</>
				) : (
					// 로그인 상태
					<>
						<li>{`${user.displayName}님 반갑습니다.`}</li>
						<li>
							<button
								type='button'
								onClick={() => {
									firebase.auth().signOut();
								}}
							>
								로그아웃
							</button>
						</li>
					</>
				)}
			</Util>
		</HeaderWrap>
	);
}

export default Header;
