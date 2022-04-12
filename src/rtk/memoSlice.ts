import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getCardsInitialState from '../utils/functions/getCardsInitialState';
import getCurrentlyComparedCardsState from '../utils/functions/getCurrentlyComparedCardsState';
import getSpecificCardState from '../utils/functions/getSpecificCardState';
import { RootState } from './store';
import { ICard } from './types';

const initialState = {
  cards: getCardsInitialState(),
};

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    flip: ({ cards }, action: PayloadAction<ICard['id']>) => {
      const card = getSpecificCardState(cards, action.payload);
      card.isFlipped = true;
    },
    setIsFlipping: (
      { cards },
      action: PayloadAction<{
        cardId: ICard['id'];
        isFlipping: ICard['isFlipping'];
      }>
    ) => {
      const card = getSpecificCardState(cards, action.payload.cardId);
      card.isFlipping = action.payload.isFlipping;
    },
    unflip: ({ cards }) => {
      const currentlyComparedCards = getCurrentlyComparedCardsState(cards);
      currentlyComparedCards.forEach((card) => (card.isFlipped = false));
    },
    check: ({ cards }) => {
      const currentlyComparedCards = getCurrentlyComparedCardsState(cards);
      currentlyComparedCards.forEach((card) => (card.isChecked = true));
    },
  },
});

export const selectCards = (state: RootState) => state.memo.cards;

export const selectFlippedCard = (id: string) => (state: RootState) =>
  state.memo.cards.find((card) => card.id === id);

export const selectCurrentlyComparedCards = ({
  memo: { cards },
}: {
  memo: { cards: ICard[] };
}) => getCurrentlyComparedCardsState(cards);

export const selectIsSomeCardFlipping = (state: RootState) =>
  state.memo.cards.some((card) => card.isFlipping);

export const { flip, setIsFlipping, unflip, check } = memoSlice.actions;

export default memoSlice.reducer;
