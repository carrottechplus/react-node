import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCXcH6FNwbKYMKkoXVZKNHH430WcVQo3Uo',
	authDomain: 'react-study-c0bec.firebaseapp.com',
	projectId: 'react-study-c0bec',
	storageBucket: 'react-study-c0bec.appspot.com',
	messagingSenderId: '1042386048230',
	appId: '1:1042386048230:web:e927ecd3cd6fa64287d727',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
