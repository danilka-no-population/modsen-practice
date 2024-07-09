import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlacesState } from '../../constants/redux.types';

const initialPlacesState: PlacesState = {
    places: [],
};

const placesSlice = createSlice({
    name: 'places',
    initialState: initialPlacesState,
    reducers: {
        updatePlacesList(state, action: PayloadAction<Place[]>) {
            state.places = action.payload;
        },
        resetPlacesList(state) {
            state.places = [];
        },
    },
});

export const { updatePlacesList: setPlacesList, resetPlacesList: clearPlacesList } = placesSlice.actions;

export default placesSlice.reducer;
