import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentUser } from './authApi';
import { RootState } from './store';

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
  },
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;
