import { ICard } from '../../rtk/types';

const getCurrentlyComparedFlippedCardsState = (cards: ICard[]) =>
  cards.filter((card) => card.isFlipped && !card.isChecked);

export default getCurrentlyComparedFlippedCardsState;
