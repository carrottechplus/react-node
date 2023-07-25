import { createSlice, getDefaultMiddleware } from '@reduxjs/toolkit';

//reducer만들기

const userSlice = createSlice({
	name: 'user',
	initialState: {
		//담고싶은 값 지정하기
		displayName: '',
		uid: '',
	},
	reducers: {
		loginUser: (state, action) => {
			state.displayName = action.payload.displayName;
			state.uid = action.payload.uid;
		},
		logoutUser: (state) => {
			state.displayName = '';
			state.uid = '';
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
