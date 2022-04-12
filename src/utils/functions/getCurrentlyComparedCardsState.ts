import { ICard } from '../../rtk/types';

const getCurrentlyComparedCardsState = (cards: ICard[]) =>
  cards.filter((card) => card.isFlipped && !card.isChecked);

export default getCurrentlyComparedCardsState;
