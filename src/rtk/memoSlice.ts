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
  /**
   * FIXME:
   * The `won` and `lost` status could be easly derived from state.
   * `lost` is when the number of hearts hits 0.
   * `won` is when the number of cards with `.isChecked` flag set to true
   * is equel to total cards number.
   */
  gameStatus: 'off' | 'on' | 'won' | 'lost';
}

const initialState: IInitialState = {
  cards: getInitialCardsState(),
  hearts: 3,
  points: 0,
  gameStatus: 'off',
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

      (() => {
        if (state.hearts === 0) return;
        if (state.hearts === 1) state.gameStatus = 'lost';
        state.hearts--;
      })();
    },
    check: (state) => {
      const currentlyComparedFlippedCards =
        getCurrentlyComparedFlippedCardsState(state.cards);
      currentlyComparedFlippedCards.forEach((card) => (card.isChecked = true));

      state.points += 100;
      const isGameWon =
        state.cards.filter((card) => card.isChecked).length ===
        state.cards.length;
      if (isGameWon) state.gameStatus = 'won';
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

export const selectGameStatus = (state: RootState) => state.memo.gameStatus;

export const { touch, flip, unflip, check } = memoSlice.actions;

export default memoSlice.reducer;
