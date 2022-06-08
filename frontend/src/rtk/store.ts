import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import memoReducer from './memoSlice';
import authReducer from './authSlice';
import { authApi } from './authApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    memo: memoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
