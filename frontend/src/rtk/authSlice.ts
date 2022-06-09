import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ICurrentUser } from './types';

const initialState: ICurrentUser = {
  id: null,
  username: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (
      state,
      { payload: { id, username, token } }: PayloadAction<ICurrentUser>
    ) => {
      state.id = id;
      state.username = username;
      state.token = token;
    },
    unsetCurrentUser: () => initialState,
  },
});

export const { setCurrentUser, unsetCurrentUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;
