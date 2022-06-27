import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ICurrentUser } from './types';

const initialState: ICurrentUser = {
  id: null,
  token: null,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (
      state,
      { payload: { id, token, username } }: PayloadAction<ICurrentUser>
    ) => {
      state.id = id;
      state.token = token;
      state.username = username;
    },
    unsetCurrentUser: () => initialState,
  },
});

export const selectCurrentUser = (state: RootState) => state.auth;

export const { setCurrentUser, unsetCurrentUser } = authSlice.actions;

export default authSlice.reducer;
