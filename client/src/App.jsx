import { Routes, Route } from 'react-router-dom'; //react 6 버전
import Header from './common/Header';
import Main from './common/Main';
import List from './community/List';
import Create from './community/Create';
import Detail from './community/Detail';
import GlobalStyle from './GlobalStyle';
import Edit from './community/Edit';

function App() {
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
			</Routes>
		</>
	);
}

export default App;