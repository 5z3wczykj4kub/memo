import classNames from 'classnames';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as StarIcon } from '../../../assets/icons/star.svg';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import useTheme from '../../../hooks/useTheme';
import {
  restart,
  selectCards,
  selectPoints,
  shuffle,
} from '../../../rtk/memoSlice';
import Button from '../../General/Button/Button';
import Modal, { useModal } from '../../General/Modal/Modal';
import styles from './Points.module.scss';

interface IPoints {
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
}

const Points = ({ setIsGameOver }: IPoints) => {
  const points = useAppSelector(selectPoints);
  const [transitionTrigger, setTransitionTrigger] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTransitionTrigger((prevState) => !prevState);
  }, [points]);

  const [isModalVisible, setIsModalVisible] = useModal();

  const totalCardPairs = useAppSelector(selectCards).length / 2;

  const onPointsTransitionEndHandler = () => {
    if (points === totalCardPairs * 100) {
      setIsModalVisible(true);
      setIsGameOver(true);
    }
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
        <div className={styles['modal-footer']}>
          <Button
            className={styles['modal-footer__button']}
            variant={isDarkThemeUsed ? 'dark' : 'light'}
            onClick={() => setIsModalVisible(false)}
          >
            Close
          </Button>
          <Button
            className={styles['modal-footer__button']}
            variant={isDarkThemeUsed ? 'dark' : 'light'}
            onClick={() => {
              setIsModalVisible(false);
              setIsGameOver(false);
              dispatch(restart());
              setTimeout(() => dispatch(shuffle()), 400);
            }}
          >
            Play again
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Points;
