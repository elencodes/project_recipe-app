import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AUTHOR_OPTIONS } from '~/constants/filter-options';
import { Option } from '~/types/option-type';

type AuthorsState = {
    authors: Option[];
    selectedAuthors: string[];
};

const initialState: AuthorsState = {
    authors: AUTHOR_OPTIONS,
    selectedAuthors: [],
};

export const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        setSelectedAuthors(state, action: PayloadAction<string[]>) {
            state.selectedAuthors = action.payload;
        },
        clearAuthors(state) {
            state.selectedAuthors = [];
        },
    },
    selectors: {
        selectSelectedAuthors: (state) => state.selectedAuthors,
        selectAuthors: (state) => state.authors,
    },
});

export const { setSelectedAuthors, clearAuthors } = authorsSlice.actions;

export const { selectSelectedAuthors, selectAuthors } = authorsSlice.selectors;

export const authorsReducer = authorsSlice.reducer;
