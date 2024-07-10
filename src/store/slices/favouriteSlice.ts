import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesState } from "../../constants/redux.types";


const initialState: FavoritesState = {
    favorites: []
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavoritesList: (state, action: PayloadAction<Place[]>) => {
            state.favorites = action.payload;
        },
        clearFavoritesList: (state) => {
            state.favorites = []
        },
        addToFavorites: (state, action: PayloadAction<Place>) => {
            if(!state.favorites.some((item: Place) => item.place_id === action.payload.place_id)){
                state.favorites.push(action.payload);
            }
        },
        deleteFromFavoritesList: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(item=> item.place_id !== action.payload)
        }
    }
});

export const { setFavoritesList, clearFavoritesList, addToFavorites, deleteFromFavoritesList } = favoritesSlice.actions;

export default favoritesSlice.reducer;