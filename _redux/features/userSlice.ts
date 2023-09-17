import { RootState } from '@/_redux/store'
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
	} as any,
	reducers: {
		login: (state, action) => {
			state.user = action.payload
		},
		logout: (state) => {
			state.user = null
		},
	},
})

export const { login, logout } = userSlice.actions

// selectors
export const selectUser = (state: RootState) => state.users.user

export default userSlice.reducer
