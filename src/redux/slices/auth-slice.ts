import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

type TokenPayload = {
    userId: string;
    login: string;
    iat: number;
    exp: number;
};

type AuthSliceState = {
    accessToken: string;
    userId: string;
};

export const initialState: AuthSliceState = {
    accessToken: '',
    userId: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            try {
                const decoded = jwtDecode<TokenPayload>(action.payload);
                state.userId = decoded.userId;
            } catch (_) {
                state.userId = '';
            }
        },
        resetAuth: () => initialState,
    },
    selectors: {
        selectAccessToken: (state) => state.accessToken,
        selectUserId: (state) => state.userId,
    },
});

export const authReducer = authSlice.reducer;
export const { setAccessToken, resetAuth } = authSlice.actions;
export const { selectAccessToken, selectUserId } = authSlice.selectors;
