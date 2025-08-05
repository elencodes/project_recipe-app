import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppError = {
    title: string;
    description: string;
} | null;

const initialState = {
    isLoading: false,
    error: null as AppError,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
    },
    selectors: {
        selectAppLoading: (state) => state.isLoading,
    },
});

export const { setAppLoader } = appSlice.actions;
export const { selectAppLoading } = appSlice.selectors;
export default appSlice.reducer;
