import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SIDE_OPTIONS } from '~/constants/filter-options';
import { Option } from '~/types/option-type';

type SidesState = {
    sides: Option[];
    selectedSides: string[];
};

const initialState: SidesState = {
    sides: SIDE_OPTIONS,
    selectedSides: [],
};

export const garnishSlice = createSlice({
    name: 'garnish',
    initialState,
    reducers: {
        setSelectedSides(state, action: PayloadAction<string[]>) {
            state.selectedSides = action.payload;
        },
        clearSides(state) {
            state.selectedSides = [];
        },
    },
    selectors: {
        selectSelectedSides: (state) => state.selectedSides,
        selectSides: (state) => state.sides,
    },
});

export const { setSelectedSides, clearSides } = garnishSlice.actions;

export const { selectSelectedSides, selectSides } = garnishSlice.selectors;

export const garnishReducer = garnishSlice.reducer;
