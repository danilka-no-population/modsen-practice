import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../constants/redux.types';

const initialUserState: UserState = {
    email: null,
    token: null,
    id: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        updateUser(state, action: PayloadAction<{ email: string, token: string, id: string }>) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        resetUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
        },
    },
});

export const { updateUser: setUser, resetUser: clearUser } = userSlice.actions;

export default userSlice.reducer;
