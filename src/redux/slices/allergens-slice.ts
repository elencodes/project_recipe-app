import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ALLERGEN_OPTIONS } from '~/constants/filter-options';
import { Option } from '~/types/option-type';

type AllergensState = {
    allergens: Option[];
    selectedAllergens: string[];
    isExcludeEnabled: boolean;
};

const initialState: AllergensState = {
    allergens: ALLERGEN_OPTIONS,
    selectedAllergens: [],
    isExcludeEnabled: false,
};

export const allergensSlice = createSlice({
    name: 'allergens',
    initialState,
    reducers: {
        setSelectedAllergens(state, action: PayloadAction<string[]>) {
            state.selectedAllergens = action.payload;
        },
        toggleExcludeAllergens(state, action: PayloadAction<boolean>) {
            state.isExcludeEnabled = action.payload;
        },
        clearAllergens(state) {
            state.selectedAllergens = [];
            state.isExcludeEnabled = false;
        },
    },
    selectors: {
        selectSelectedAllergens: (state) => state.selectedAllergens,
        selectIsExcludeEnabled: (state) => state.isExcludeEnabled,
        selectAllergens: (state) => state.allergens,
    },
});

export const { setSelectedAllergens, toggleExcludeAllergens, clearAllergens } =
    allergensSlice.actions;

export const { selectSelectedAllergens, selectIsExcludeEnabled, selectAllergens } =
    allergensSlice.selectors;

export const allergensReducer = allergensSlice.reducer;
