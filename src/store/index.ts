import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import filterReducer from './reducers/filterSlice';
import placesReducer from './reducers/placeSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        filter: filterReducer,
        places: placesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
