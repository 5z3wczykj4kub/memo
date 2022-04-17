import Memo from '../../components/Memo/Memo';
import { store } from '../../rtk/store';
import { ICard } from '../../rtk/types';
import TechnologyName from '../constants';
import { render } from './customRender';

const initialCardState = {
  id: 'React.js8',
  name: 'React.js',
  fileName: 'react',
  src: './images/react.png',
  isTouched: false,
  isFlipped: false,
  isChecked: false,
};

const findCard = (card: ICard) => card.fileName === TechnologyName['React.js'];

const cardStoreData = store.getState().memo.cards.find(findCard)!;

const renderCard = () => render(<Memo.Card {...cardStoreData} />);

export { initialCardState, findCard, cardStoreData, renderCard };
