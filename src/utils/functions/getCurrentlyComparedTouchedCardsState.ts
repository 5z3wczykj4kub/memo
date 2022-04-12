import { ICard } from '../../rtk/types';

const getCurrentlyComparedTouchedCardsState = (cards: ICard[]) =>
  cards.filter((card) => card.isTouched && !card.isChecked);

export default getCurrentlyComparedTouchedCardsState;
