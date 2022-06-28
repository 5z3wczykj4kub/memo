import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ICurrentUser } from './types';

interface IInitialState extends ICurrentUser {
  shouldUpdate: boolean;
}

const initialState: IInitialState = {
  id: null,
  token: null,
  username: null,
  shouldUpdate: false,
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
    setShouldUpdate: (state, { payload }: PayloadAction<boolean>) => {
      state.shouldUpdate = payload;
    },
    unsetCurrentUser: () => initialState,
  },
});

export const selectCurrentUser = (state: RootState) => state.auth;

export const { setCurrentUser, setShouldUpdate, unsetCurrentUser } =
  authSlice.actions;

export default authSlice.reducer;
