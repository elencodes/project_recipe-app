import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipes } from '~/query/services/recipes/types.ts';

type RecipesState = {
    filteredRecipes: Recipes;
    filteredPage: number;
    hasMore: boolean;
    showEmptyText: boolean;
    isFiltering: boolean;
};

const initialState: RecipesState = {
    filteredRecipes: [],
    filteredPage: 1,
    hasMore: true,
    showEmptyText: false,
    isFiltering: false,
};

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setFilteredRecipes(state, action: PayloadAction<Recipes>) {
            state.filteredRecipes = action.payload;
            state.filteredPage = 1;
        },
        appendFilteredRecipes(state, action: PayloadAction<Recipes>) {
            state.filteredRecipes.push(...action.payload);
        },
        incrementPage(state) {
            state.filteredPage += 1;
        },
        setHasMore(state, action: PayloadAction<boolean>) {
            state.hasMore = action.payload;
        },
        setShowedEmptyText: (state, { payload }: PayloadAction<boolean>) => {
            state.showEmptyText = payload;
        },
        setIsFiltering: (state, { payload }: PayloadAction<boolean>) => {
            state.isFiltering = payload;
        },
        clearFilteredRecipes(state) {
            state.filteredRecipes = [];
        },
        clearPage(state) {
            state.filteredPage = 1;
            state.hasMore = true;
        },
    },
    selectors: {
        selectFilteredRecipes: (state) => state.filteredRecipes,
        selectShowEmptyText: (state) => state.showEmptyText,
        selectIsFiltering: (state) => state.isFiltering,
        selectFilteredPage: (state) => state.filteredPage,
        selectHasMore: (state) => state.hasMore,
    },
});

export const {
    setFilteredRecipes,
    clearFilteredRecipes,
    setShowedEmptyText,
    setIsFiltering,
    appendFilteredRecipes,
    incrementPage,
    setHasMore,
    clearPage,
} = recipesSlice.actions;

export const {
    selectFilteredRecipes,
    selectShowEmptyText,
    selectIsFiltering,
    selectFilteredPage,
    selectHasMore,
} = recipesSlice.selectors;

export const recipesReducer = recipesSlice.reducer;
