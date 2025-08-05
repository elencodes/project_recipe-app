import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchState = {
    inputValue: string;
    searchValue: string;
};

export const initialState: SearchState = {
    inputValue: '',
    searchValue: '',
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setInputValue(state, action: PayloadAction<string>) {
            state.inputValue = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        clearInputValue(state) {
            state.inputValue = '';
        },
        clearSearchValue(state) {
            state.searchValue = '';
        },
    },
    selectors: {
        selectInputValue: (state) => state.inputValue,
        selectSearchValue: (state) => state.searchValue,
    },
});

export const { setInputValue, clearInputValue, setSearchValue, clearSearchValue } =
    searchSlice.actions;

export const { selectInputValue, selectSearchValue } = searchSlice.selectors;

export const searchReducer = searchSlice.reducer;
