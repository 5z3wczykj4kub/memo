import { Dispatch, SetStateAction } from 'react';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useTheme from '../../../hooks/useTheme';
import { restart, shuffle } from '../../../rtk/memoSlice';
import Button from '../../General/Button/Button';
import Modal from '../../General/Modal/Modal';
import { TGameStatus } from '../Navbar/Navbar';
import styles from './EndgameModal.module.scss';

interface IEndgameModal {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  gameStatus: TGameStatus;
  setGameStatus: Dispatch<SetStateAction<TGameStatus>>;
}

const EndgameModal = ({
  isVisible,
  setIsVisible,
  gameStatus,
  setGameStatus,
}: IEndgameModal) => {
  const dispatch = useAppDispatch();

  const { isDarkThemeUsed } = useTheme();

  return (
    <Modal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      heading={
        gameStatus === 'won' ? <b>Congratulations!</b> : <b>What a bummer 😥</b>
      }
      variant={isDarkThemeUsed ? 'dark' : 'light'}
    >
      {gameStatus === 'won' ? (
        <p>You've won the game.</p>
      ) : (
        <p>
          You've lost the game. Try again, maybe you'll have better luck next
          time!
        </p>
      )}
      <div className={styles['modal-footer']}>
        <Button
          className={styles['modal-footer__button']}
          variant={isDarkThemeUsed ? 'dark' : 'light'}
          onClick={() => setIsVisible(false)}
        >
          Close
        </Button>
        <Button
          className={styles['modal-footer__button']}
          variant={isDarkThemeUsed ? 'dark' : 'light'}
          onClick={() => {
            setIsVisible(false);
            setGameStatus(null);
            dispatch(restart());
            setTimeout(() => dispatch(shuffle()), 400);
          }}
        >
          Play again
        </Button>
      </div>
    </Modal>
  );
};

export default EndgameModal;
