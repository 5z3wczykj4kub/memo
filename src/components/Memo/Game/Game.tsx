import useAppSelector from '../../../hooks/useAppSelector';
import { selectCards } from '../../../rtk/memoSlice';
import Memo from '../Memo';

const Game = () => {
  const cards = useAppSelector(selectCards);

  return (
    <Memo.Grid>
      {cards.map((card) => (
        <Memo.Card key={card.id} {...card} />
      ))}
    </Memo.Grid>
  );
};

export default Game;
