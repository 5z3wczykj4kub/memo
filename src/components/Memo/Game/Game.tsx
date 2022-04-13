import { useEffect } from 'react';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import {
  check,
  selectCards,
  selectCurrentlyComparedFlippedCards,
  unflip,
} from '../../../rtk/memoSlice';
import Memo from '../Memo';

const Game = () => {
  const cards = useAppSelector(selectCards);
  const currentlyComparedFlippedCards = useAppSelector(
    selectCurrentlyComparedFlippedCards
  );

  const areTwoCardsFlipped = currentlyComparedFlippedCards.length === 2;

  const dispatch = useAppDispatch();

  useEffect(() => {
    (() => {
      if (!areTwoCardsFlipped) return;
      const [firstCard, secondCard] = currentlyComparedFlippedCards;
      if (firstCard.name === secondCard.name) return dispatch(check());
      return dispatch(unflip());
    })();
  }, [dispatch, areTwoCardsFlipped, currentlyComparedFlippedCards]);

  return (
    <Memo.Grid>
      {cards.map((card) => (
        <Memo.Card key={card.id} {...card} />
      ))}
    </Memo.Grid>
  );
};

export default Game;
