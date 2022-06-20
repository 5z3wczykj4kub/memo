import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ICurrentUser } from './types';

const initialState: ICurrentUser = {
  id: null,
  token: null,
  username: null,
  experience: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (
      state,
      {
        payload: { id, token, username, experience },
      }: PayloadAction<ICurrentUser>
    ) => {
      state.id = id;
      state.token = token;
      state.username = username;
      state.experience = experience;
    },
    unsetCurrentUser: () => initialState,
  },
});

export const selectCurrentUser = (state: RootState) => state.auth;

export const { setCurrentUser, unsetCurrentUser } = authSlice.actions;

export default authSlice.reducer;
