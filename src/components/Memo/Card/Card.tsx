import classNames from 'classnames';
import { useEffect } from 'react';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import {
  check,
  flip,
  selectCurrentlyComparedFlippedCards,
  selectCurrentlyComparedTouchedCards,
  selectTouchedCard,
  touch,
  unflip,
} from '../../../rtk/memoSlice';
import styles from './Card.module.scss';

type CardProps = {
  id: string;
  src: string;
};

const Card = ({ src, id: cardId }: CardProps) => {
  const { isTouched, isChecked } = useAppSelector(selectTouchedCard(cardId))!;
  const currentlyComparedTouchedCards = useAppSelector(
    selectCurrentlyComparedTouchedCards
  );
  const currentlyComparedFlippedCards = useAppSelector(
    selectCurrentlyComparedFlippedCards
  );

  const isComparingTouchedCards = currentlyComparedTouchedCards.length === 2;
  const isComparingFlippedCards = currentlyComparedFlippedCards.length === 2;

  const isCardDisabled = isTouched || isComparingTouchedCards;

  const dispatch = useAppDispatch();

  const onCardClickHandler = () => {
    if (isCardDisabled) return;
    dispatch(touch(cardId));
  };

  const onCardFlipTransitionEndHandler = () => {
    dispatch(flip(cardId));
  };

  /**
   * FIXME:
   * Action dispatched way to many times.
   */
  useEffect(() => {
    (() => {
      if (!isComparingFlippedCards) return;
      const [firstCard, secondCard] = currentlyComparedFlippedCards;
      if (firstCard.name === secondCard.name) return dispatch(check());
      return dispatch(unflip());
    })();
  }, [dispatch, isComparingFlippedCards, currentlyComparedFlippedCards]);

  const className = [
    classNames({
      [styles.card]: true,
      [styles['card--flipped']]: isTouched || isChecked,
      [styles['card--disabled']]: isCardDisabled,
    }),
    styles['card__image'],
    classNames({
      [styles['card__image']]: true,
      [styles['card__image--flipped']]: true,
    }),
  ];

  return (
    <article
      className={className[0]}
      onClick={onCardClickHandler}
      onTransitionEnd={onCardFlipTransitionEndHandler}
    >
      <img className={className[1]} src='./images/code.png' alt='code' />
      <img className={className[2]} src={src} alt={src} />
    </article>
  );
};

export default Card;
