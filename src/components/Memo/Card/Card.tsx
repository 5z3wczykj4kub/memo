import classNames from 'classnames';
import { useState } from 'react';
import styles from './Card.module.scss';

type CardProps = {
  id: string;
  src: string;
};

const Card = ({ src }: CardProps) => {
  const [rotated, setRotated] = useState(false);

  const className = [
    classNames({
      [styles.card]: true,
      [styles['card--rotated']]: rotated,
    }),
    styles['card__image'],
    classNames({
      [styles['card__image']]: true,
      [styles['card__image--rotated']]: true,
    }),
  ];

  return (
    <article
      className={className[0]}
      onClick={() => setRotated(true)}
      onTransitionEnd={() => console.log('transitionEnd')}
    >
      <img className={className[1]} src='./images/code.png' alt='code' />
      <img className={className[2]} src={src} alt={src} />
    </article>
  );
};

export default Card;
