import classNames from 'classnames';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import {
  flip,
  selectCurrentlyComparedFlippedCards,
  selectCurrentlyComparedTouchedCards,
  selectTouchedCard,
  touch,
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

  const isOneCardTouched = currentlyComparedTouchedCards.length === 1;
  const areTwoCardsTouched = currentlyComparedTouchedCards.length === 2;
  const isCardDisabled = isTouched || areTwoCardsTouched;

  const dispatch = useAppDispatch();

  const onCardClickHandler = () => {
    if (isCardDisabled) return;
    dispatch(touch(cardId));
  };

  const onCardFlipTransitionEndHandler = () => {
    /**
     * TODO:
     * This guard clause gets bypassed.
     * Because this is not the first time
     * we need to distinguish the actual animation state
     * (transitioning, transitioned, transitioning back, transitioned back),
     * change CSS transition to either keyframes or use React Transition Group.
     */
    if (currentlyComparedTouchedCards.length === 0) return;
    dispatch(flip(cardId));
  };

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
