import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import memoSlice from './memoSlice';
import counterSlice from '../counter/counterSlice';

// Store
export const store = configureStore({
  reducer: {
    counter: counterSlice, // REMOVE
    memo: memoSlice,
  },
});

// Types
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
