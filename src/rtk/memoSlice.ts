import { createSlice } from '@reduxjs/toolkit';
import getCardsStateArray from '../utils/functions/getCardsStateArray';
import { RootState } from './store';

const initialState = {
  cards: getCardsStateArray(),
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
