import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MEAT_OPTIONS } from '~/constants/filter-options';
import { Option } from '~/types/option-type';

type MeatState = {
    meats: Option[];
    selectedMeats: string[];
};

const initialState: MeatState = {
    meats: MEAT_OPTIONS,
    selectedMeats: [],
};

export const meatSlice = createSlice({
    name: 'meat',
    initialState,
    reducers: {
        setSelectedMeats(state, action: PayloadAction<string[]>) {
            state.selectedMeats = action.payload;
        },
        clearMeats(state) {
            state.selectedMeats = [];
        },
    },
    selectors: {
        selectMeats: (state) => state.meats,
        selectSelectedMeats: (state) => state.selectedMeats,
    },
});

export const { setSelectedMeats, clearMeats } = meatSlice.actions;

export const { selectSelectedMeats, selectMeats } = meatSlice.selectors;

export const meatReducer = meatSlice.reducer;
