import { ICard } from '../../rtk/types';

const getSpecificCardState = (cards: ICard[], cardId: ICard['id']) =>
  cards.find((card) => card.id === cardId)!;

export default getSpecificCardState;
