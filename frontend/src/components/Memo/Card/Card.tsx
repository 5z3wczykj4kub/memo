import classNames from 'classnames';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import {
  check,
  flip,
  selectCurrentlyComparedFlippedCards,
  selectCurrentlyComparedTouchedCards,
  selectHearts,
  selectTouchedCard,
  touch,
  unflip,
} from '../../../rtk/memoSlice';
import { ICard } from '../../../rtk/types';
import styles from './Card.module.scss';

const Card = ({ id: cardId, src, name }: ICard) => {
  const hearts = useAppSelector(selectHearts);
  const { isTouched } = useAppSelector(selectTouchedCard(cardId))!;
  const currentlyComparedTouchedCards = useAppSelector(
    selectCurrentlyComparedTouchedCards
  );
  const currentlyComparedFlippedCards = useAppSelector(
    selectCurrentlyComparedFlippedCards
  );

  const areTwoCardsTouched = currentlyComparedTouchedCards.length === 2;
  const areTwoCardsFlipped = currentlyComparedFlippedCards.length === 2;
  const isCardDisabled = isTouched || areTwoCardsTouched || hearts === 0;

  const [canCompare, setCanCompare] = useState(false);

  const dispatch = useAppDispatch();

  const onCardClickHandler = () => {
    if (isCardDisabled) return;
    dispatch(touch(cardId));
  };

  const onCardTransitionEnterHandler = () => dispatch(flip(cardId));

  const onCardTransitionEnteringHandler = () =>
    areTwoCardsFlipped ? setCanCompare(true) : setCanCompare(false);

  const onCardTransitionEnteredHandler = () => {
    if (!canCompare) return;
    const [firstCard, secondCard] = currentlyComparedFlippedCards;
    if (firstCard.name === secondCard.name) return dispatch(check());
    return dispatch(unflip());
  };

  const className = [
    classNames({
      [styles.card]: true,
      [styles['card--flipped']]: isTouched,
      [styles['card--disabled']]: isCardDisabled,
    }),
    styles['card__image'],
    classNames({
      [styles['card__image']]: true,
      [styles['card__image--flipped']]: true,
    }),
  ];

  return (
    <CSSTransition
      in={isTouched}
      timeout={400}
      classNames={{ ...styles }}
      onEnter={onCardTransitionEnterHandler}
      onEntering={onCardTransitionEnteringHandler}
      onEntered={onCardTransitionEnteredHandler}
    >
      <button
        className={className[0]}
        onClick={onCardClickHandler}
        data-testid={cardId}
      >
        <img
          className={className[1]}
          src='./images/code.png'
          alt='code'
          hidden={isTouched}
        />
        <img
          className={className[2]}
          src={src}
          alt={name}
          hidden={!isTouched}
        />
      </button>
    </CSSTransition>
  );
};

export default Card;
