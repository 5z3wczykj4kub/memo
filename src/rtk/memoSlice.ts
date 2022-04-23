import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getInitialCardsState from '../utils/functions/getInitialCardsState';
import getCurrentlyComparedFlippedCardsState from '../utils/functions/getCurrentlyComparedFlippedCardsState';
import getCurrentlyComparedTouchedCardsState from '../utils/functions/getCurrentlyComparedTouchedCardsState';
import getSpecificCardState from '../utils/functions/getSpecificCardState';
import { RootState } from './store';
import { ICard } from './types';

const initialState = {
  cards: getInitialCardsState(),
};

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    touch: ({ cards }, action: PayloadAction<ICard['id']>) => {
      const card = getSpecificCardState(cards, action.payload);
      card.isTouched = true;
    },
    flip: ({ cards }, action: PayloadAction<ICard['id']>) => {
      const card = getSpecificCardState(cards, action.payload);
      card.isFlipped = true;
    },
    unflip: ({ cards }) => {
      const currentlyComparedFlippedCards =
        getCurrentlyComparedFlippedCardsState(cards);
      currentlyComparedFlippedCards.forEach((card) => {
        card.isTouched = false;
        card.isFlipped = false;
      });
    },
    check: ({ cards }) => {
      const currentlyComparedFlippedCards =
        getCurrentlyComparedFlippedCardsState(cards);
      currentlyComparedFlippedCards.forEach((card) => (card.isChecked = true));
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

export const { touch, flip, unflip, check } = memoSlice.actions;

export default memoSlice.reducer;
