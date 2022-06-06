import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import memoSlice from './memoSlice';

export const store = configureStore({
  reducer: {
    memo: memoSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
