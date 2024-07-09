import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {FilterState} from "../../constants/redux.types";

const initialState: FilterState = {
    buildingType: 'park',
    radius: '1000',
    name: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<{ buildingType: string, radius: string, name: string }>) => {
            state.buildingType = action.payload.buildingType;
            state.radius = action.payload.radius;
            state.name = action.payload.name;
        },
        clearFilter: (state) => {
            state.buildingType = '';
            state.radius = '';
            state.name = '';
        }
    }
});

export const { setFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;