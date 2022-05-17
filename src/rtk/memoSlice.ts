import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getCurrentlyComparedFlippedCardsState from '../utils/functions/getCurrentlyComparedFlippedCardsState';
import getCurrentlyComparedTouchedCardsState from '../utils/functions/getCurrentlyComparedTouchedCardsState';
import getInitialCardsState from '../utils/functions/getInitialCardsState';
import getSpecificCardState from '../utils/functions/getSpecificCardState';
import shuffleCards from '../utils/functions/shuffleCards';
import { RootState } from './store';
import { ICard, TDifficultyLevel } from './types';

interface IInitialState {
  cards: ICard[];
  hearts: number;
  points: number;
  difficultyLevel: TDifficultyLevel;
}

const getInitialState = (isInitial = false): IInitialState => {
  const getDifficultyLevel = () =>
    (localStorage.getItem('difficultyLevel') as TDifficultyLevel) || 'medium';

  return {
    cards: isInitial
      ? shuffleCards(getInitialCardsState(getDifficultyLevel()))
      : getInitialCardsState(getDifficultyLevel()),
    hearts: 5,
    points: 0,
    difficultyLevel: getDifficultyLevel(),
  };
};

export const memoSlice = createSlice({
  name: 'memo',
  initialState: getInitialState(true),
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
    shuffle: (state) => ({ ...state, cards: shuffleCards(state.cards) }),
    restart: (state) => ({
      ...getInitialState(),
      cards: state.cards.map((card) => ({
        ...card,
        isTouched: false,
        isFlipped: false,
        isChecked: false,
      })),
    }),
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

export const { touch, flip, unflip, check, shuffle, restart } =
  memoSlice.actions;

export default memoSlice.reducer;
