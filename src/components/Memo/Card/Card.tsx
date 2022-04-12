import classNames from 'classnames';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import {
  flip,
  selectFlippedCard,
  selectCurrentlyComparedCards,
  check,
  unflip,
  setIsFlipping,
  selectIsSomeCardFlipping,
} from '../../../rtk/memoSlice';
import styles from './Card.module.scss';

type CardProps = {
  id: string;
  src: string;
};

const Card = ({ src, id: cardId }: CardProps) => {
  const { isFlipped, isChecked } = useAppSelector(selectFlippedCard(cardId))!;
  const currentlyComparedCards = useAppSelector(selectCurrentlyComparedCards);
  const isSomeCardFlipping = useAppSelector(selectIsSomeCardFlipping);
  const isComparingCards = currentlyComparedCards.length === 2;
  const isCardDisabled = isFlipped || isSomeCardFlipping || isComparingCards;

  const dispatch = useAppDispatch();

  const onCardClickHandler = () => {
    if (isCardDisabled) return;

    dispatch(setIsFlipping({ cardId, isFlipping: true }));
    dispatch(flip(cardId));
  };

  const onCardFlipTransitionEndHandler = () => {
    dispatch(setIsFlipping({ cardId, isFlipping: false }));

    if (!isComparingCards) return;

    const [firstCard, secondCard] = currentlyComparedCards;

    if (firstCard.name === secondCard.name) {
      dispatch(check());
      return;
    }

    dispatch(unflip());
  };

  const className = [
    classNames({
      [styles.card]: true,
      [styles['card--flipped']]: isFlipped || isChecked,
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
