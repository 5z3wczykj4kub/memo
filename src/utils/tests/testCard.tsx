import Memo from '../../components/Memo/Memo';
import { ICard } from '../../rtk/types';
import TechnologyName from '../constants';
import { render, store } from './customRender';

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

const getCardStoreData = () => store.getState().memo.cards.find(findCard)!;

const getAllCardsStoreData = () => store.getState().memo.cards;

const getMatchingCardsStoreData = () =>
  getAllCardsStoreData().filter(({ name }) => name === 'React.js');

const renderCard = () => render(<Memo.Card {...getCardStoreData()} />);

const renderCards = () =>
  render(
    <Memo.Grid>
      {getAllCardsStoreData().map((card) => (
        <Memo.Card key={card.id} {...card} />
      ))}
    </Memo.Grid>
  );

export {
  initialCardState,
  findCard,
  getCardStoreData,
  getAllCardsStoreData,
  getMatchingCardsStoreData,
  renderCard,
  renderCards,
};
