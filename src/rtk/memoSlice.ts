import { createSlice } from '@reduxjs/toolkit';
import getCardsState from '../utils/functions/getCardsState';
import { RootState } from './store';

const initialState = {
  cards: getCardsState(),
};

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    todo: (state) => {},
  },
});

export const selectCards = (state: RootState) => state.memo.cards;

export const { todo } = memoSlice.actions;

export default memoSlice.reducer;
