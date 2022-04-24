import { useEffect } from 'react';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectCards, selectGameStatus } from '../../../rtk/memoSlice';
import Memo from '../Memo';

const Game = () => {
  const cards = useAppSelector(selectCards);
  const gameStatus = useAppSelector(selectGameStatus);

  /**
   * TODO:
   * Temp end game.
   */
  useEffect(() => {
    if (gameStatus === 'won') alert('won');
    if (gameStatus === 'lost') alert('lost');
  }, [gameStatus]);

  return (
    <Memo.Grid>
      {cards.map((card) => (
        <Memo.Card key={card.id} {...card} />
      ))}
    </Memo.Grid>
  );
};

export default Game;
