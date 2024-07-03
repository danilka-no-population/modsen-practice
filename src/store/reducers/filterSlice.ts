import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '../../constants/redux.types';

const initialFilterState: FilterState = {
    buildingType: '',
    radius: '1000',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilterState,
    reducers: {
        updateFilter(state, action: PayloadAction<{ buildingType: string; radius: string }>) {
            state.buildingType = action.payload.buildingType;
            state.radius = action.payload.radius;
        },
        resetFilter(state) {
            state.buildingType = '';
            state.radius = '';
        },
    },
});

export const { updateFilter: setFilter, resetFilter: clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
