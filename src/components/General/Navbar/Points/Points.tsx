import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as StarIcon } from '../../../../assets/icons/star.svg';
import useAppSelector from '../../../../hooks/useAppSelector';
import useTheme from '../../../../hooks/useTheme';
import { selectPoints } from '../../../../rtk/memoSlice';
import TechnologyName from '../../../../utils/constants';
import Modal, { useModal } from '../../Modal/Modal';
import styles from './Points.module.scss';

const Points = () => {
  const points = useAppSelector(selectPoints);
  const [transitionTrigger, setTransitionTrigger] = useState(false);

  useEffect(() => {
    setTransitionTrigger((prevState) => !prevState);
  }, [points]);

  const [isModalVisible, setIsModalVisible] = useModal();

  const onPointsTransitionEndHandler = () => {
    const totalCardPairs = Object.keys(TechnologyName).length;
    if (points === totalCardPairs * 100) setIsModalVisible(true);
  };

  const { isDarkThemeUsed } = useTheme();

  const className = classNames({
    [styles['points__number']]: true,
    [styles['points__number--dark']]: isDarkThemeUsed,
  });

  return (
    <>
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
      <Modal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        heading={<b>Congratulations!</b>}
        variant={isDarkThemeUsed ? 'dark' : 'light'}
      >
        <p>You've won the game.</p>
      </Modal>
    </>
  );
};

export default Points;
