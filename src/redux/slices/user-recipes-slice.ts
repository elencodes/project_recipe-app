import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Note } from '~/query/services/blogs/types.ts';
import { Recipe } from '~/query/services/recipes/types.ts';

type UserRecipesState = {
    bookmarks: Recipe[];
    notes: Note[];
    totalSubscribers: number;
    totalBookmarks: number;
};

const initialState: UserRecipesState = {
    bookmarks: [],
    notes: [],
    totalSubscribers: 0,
    totalBookmarks: 0,
};

export const userRecipesSlice = createSlice({
    name: 'userRecipes',
    initialState,
    reducers: {
        setUserRecipes(
            state,
            action: PayloadAction<Pick<UserRecipesState, 'notes' | 'bookmarks'>>,
        ) {
            state.bookmarks = action.payload.bookmarks;
            state.notes = action.payload.notes;
        },
        setUserSubscribers(state, action: PayloadAction<number>) {
            state.totalSubscribers = action.payload;
        },
        setUserBookmarks(state, action: PayloadAction<number>) {
            state.totalBookmarks = action.payload;
        },
        clearUserRecipes(state) {
            state.bookmarks = [];
            state.notes = [];
        },
        addNote(state, action: PayloadAction<Note>) {
            state.notes.push(action.payload);
        },
        removeNote(state, action: PayloadAction<string>) {
            state.notes = state.notes.filter((note) => note._id !== action.payload);
        },
        toggleBookmark(state, action: PayloadAction<Recipe>) {
            const index = state.bookmarks.findIndex((b) => b._id === action.payload._id);
            if (index === -1) {
                state.bookmarks.push(action.payload);
            } else {
                state.bookmarks.splice(index, 1);
            }
        },
    },
    selectors: {
        selectUserBookmarks: (state) => state.bookmarks,
        selectUserNotes: (state) => state.notes,
        selectTotalSubscribers: (state) => state.totalSubscribers,
        selectTotalBookmarks: (state) => state.totalBookmarks,
    },
});

export const {
    setUserRecipes,
    addNote,
    removeNote,
    toggleBookmark,
    setUserSubscribers,
    setUserBookmarks,
} = userRecipesSlice.actions;
export const {
    selectUserBookmarks,
    selectUserNotes,
    selectTotalSubscribers,
    selectTotalBookmarks,
} = userRecipesSlice.selectors;
export const userRecipesReducer = userRecipesSlice.reducer;
