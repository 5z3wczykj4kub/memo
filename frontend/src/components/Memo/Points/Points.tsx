import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as StarIcon } from '../../../assets/icons/star.svg';
import useAppSelector from '../../../hooks/useAppSelector';
import useTheme from '../../../hooks/useTheme';
import { selectCards, selectPoints } from '../../../rtk/memoSlice';
import styles from './Points.module.scss';

interface IPoints {
  onGameWin: () => void;
}

const Points = ({ onGameWin }: IPoints) => {
  const points = useAppSelector(selectPoints);
  const [transitionTrigger, setTransitionTrigger] = useState(false);

  useEffect(() => {
    setTransitionTrigger((prevState) => !prevState);
  }, [points]);

  const totalCardPairs = useAppSelector(selectCards).length / 2;

  const onPointsTransitionEndHandler = () => {
    if (points === totalCardPairs * 100) onGameWin();
  };

  const { isDarkThemeUsed } = useTheme();

  const className = classNames({
    [styles['points__number']]: true,
    [styles['points__number--dark']]: isDarkThemeUsed,
  });

  return (
    <CSSTransition
      in={transitionTrigger}
      timeout={200}
      classNames={{ ...styles }}
      onEntered={onPointsTransitionEndHandler}
      onExited={onPointsTransitionEndHandler}
    >
      <div className={styles.points}>
        <StarIcon className={styles['points__star-icon']} />
        <span className={className}>{points}</span>
      </div>
    </CSSTransition>
  );
};

export default Points;
