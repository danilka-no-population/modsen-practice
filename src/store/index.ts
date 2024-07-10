import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import filterReducer from './slices/filterSlice';
import placesReducer from './slices/placeSlice';
import favoritesReducer from './slices/favouriteSlice'
import {thunk} from "redux-thunk";

const store = configureStore({
    reducer: {
        user: userReducer,
        filter: filterReducer,
        places: placesReducer,
        favorites: favoritesReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export default store;