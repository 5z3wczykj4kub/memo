import { Dispatch, SetStateAction } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import useTheme from '../../../hooks/useTheme';
import { restart, selectHearts, shuffle } from '../../../rtk/memoSlice';
import Button from '../../General/Button/Button';
import Modal, { useModal } from '../../General/Modal/Modal';
import Heart from './Heart/Heart';
import styles from './Hearts.module.scss';

interface IHearts {
  isGameOver: boolean;
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
}

const Hearts = ({ isGameOver, setIsGameOver }: IHearts) => {
  const hearts = useAppSelector(selectHearts);

  const dispatch = useAppDispatch();

  const [isModalVisible, setIsModalVisible] = useModal();

  const onHeartTransitionExitedHandler = () => {
    if (hearts === 1) {
      setIsModalVisible(true);
      setIsGameOver(true);
    }
  };

  const { isDarkThemeUsed } = useTheme();

  return (
    <>
      {isGameOver ? (
        <Button
          className={styles['play-again-button']}
          variant={isDarkThemeUsed ? 'dark' : 'light'}
          onClick={() => {
            setIsGameOver(false);
            dispatch(restart());
            setTimeout(() => dispatch(shuffle()), 400);
          }}
        >
          Play again
        </Button>
      ) : (
        <div className={styles.hearts}>
          <TransitionGroup component={null}>
            {Array.from(Array(hearts)).map((_, index) => (
              <CSSTransition
                key={index}
                timeout={800}
                classNames={{ ...styles }}
                onExited={onHeartTransitionExitedHandler}
              >
                <Heart />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      )}

      <Modal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        heading={<b>What a bummer 😥</b>}
        variant={isDarkThemeUsed ? 'dark' : 'light'}
      >
        <p>
          You've lost the game. Try again, maybe you'll have better luck next
          time!
        </p>
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

export default Hearts;
