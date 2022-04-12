import { createSlice, createAction } from '@reduxjs/toolkit';
import getCardsState from '../utils/functions/getCardsState';
import getCurrentlyComparedCardsState from '../utils/functions/getCurrentlyComparedCardsState';
import { RootState } from './store';

const initialState = {
  cards: getCardsState(),
};

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    flip: (state, action) => {
      const card = state.cards.find((card) => card.id === action.payload)!;
      card.isFlipped = true;
    },
    unflip: (state) => {
      const currentlyComparedCards = getCurrentlyComparedCardsState(state);
      currentlyComparedCards.forEach((card) => (card.isFlipped = false));
    },
    check: (state) => {
      const currentlyComparedCards = getCurrentlyComparedCardsState(state);
      currentlyComparedCards.forEach((card) => (card.isChecked = true));
    },
  },
});

export const selectCards = (state: RootState) => state.memo.cards;

export const selectFlippedCard = (id: string) => (state: RootState) =>
  state.memo.cards.find((card) => card.id === id);

export const selectCurrentlyComparedCards = (state: RootState) =>
  state.memo.cards.filter((card) => card.isFlipped && !card.isChecked);

export const { flip, unflip, check } = memoSlice.actions;

export default memoSlice.reducer;
