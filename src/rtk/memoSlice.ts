import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getInitialCardsState from '../utils/functions/getInitialCardsState';
import getCurrentlyComparedFlippedCardsState from '../utils/functions/getCurrentlyComparedFlippedCardsState';
import getCurrentlyComparedTouchedCardsState from '../utils/functions/getCurrentlyComparedTouchedCardsState';
import getSpecificCardState from '../utils/functions/getSpecificCardState';
import { RootState } from './store';
import { ICard } from './types';

interface IInitialState {
  cards: ICard[];
  hearts: number;
  points: number;
}

const initialState: IInitialState = {
  cards: getInitialCardsState(),
  hearts: 5,
  points: 0,
};

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    touch: (state, action: PayloadAction<ICard['id']>) => {
      const card = getSpecificCardState(state.cards, action.payload);
      card.isTouched = true;
    },
    flip: (state, action: PayloadAction<ICard['id']>) => {
      const card = getSpecificCardState(state.cards, action.payload);
      card.isFlipped = true;
    },
    unflip: (state) => {
      const currentlyComparedFlippedCards =
        getCurrentlyComparedFlippedCardsState(state.cards);
      currentlyComparedFlippedCards.forEach((card) => {
        card.isTouched = false;
        card.isFlipped = false;
      });

      if (state.hearts !== 0) state.hearts--;
    },
    check: (state) => {
      const currentlyComparedFlippedCards =
        getCurrentlyComparedFlippedCardsState(state.cards);
      currentlyComparedFlippedCards.forEach((card) => (card.isChecked = true));

      state.points += 100;
    },
  },
});

export const selectCards = (state: RootState) => state.memo.cards;

export const selectTouchedCard = (id: string) => (state: RootState) =>
  state.memo.cards.find((card) => card.id === id);

export const selectCurrentlyComparedTouchedCards = ({
  memo: { cards },
}: {
  memo: { cards: ICard[] };
}) => getCurrentlyComparedTouchedCardsState(cards);

export const selectCurrentlyComparedFlippedCards = ({
  memo: { cards },
}: {
  memo: { cards: ICard[] };
}) => getCurrentlyComparedFlippedCardsState(cards);

export const selectHearts = (state: RootState) => state.memo.hearts;

export const selectPoints = (state: RootState) => state.memo.points;

export const { touch, flip, unflip, check } = memoSlice.actions;

export default memoSlice.reducer;
