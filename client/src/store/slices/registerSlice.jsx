import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        token: sessionStorage.getItem('token') || null,
        error: null,
    },
    reducers: {
        registerSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            sessionStorage.setItem('user', JSON.stringify(action.payload.user));
            sessionStorage.setItem('token', action.payload.token);
            state.error = null;
        },
        registerFailure: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { registerSuccess, registerFailure } = registerSlice.actions;

export default registerSlice.reducer;
