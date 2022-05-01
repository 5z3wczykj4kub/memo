import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as StarIcon } from '../../../../assets/icons/star.svg';
import useAppSelector from '../../../../hooks/useAppSelector';
import useTheme from '../../../../hooks/useTheme';
import { selectPoints } from '../../../../rtk/memoSlice';
import styles from './Points.module.scss';

const Points = () => {
  const points = useAppSelector(selectPoints);
  const [transitionTrigger, setTransitionTrigger] = useState(false);

  useEffect(() => {
    setTransitionTrigger((prevState) => !prevState);
  }, [points]);

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
    >
      <div className={styles.points}>
        <StarIcon className={styles['points__star-icon']} />
        <span className={className}>{points}</span>
      </div>
    </CSSTransition>
  );
};

export default Points;
