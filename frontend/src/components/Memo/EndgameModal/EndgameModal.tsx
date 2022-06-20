import { Dispatch, SetStateAction } from 'react';
import useTheme from '../../../hooks/useTheme';
import Button from '../../General/Button/Button';
import Modal from '../../General/Modal/Modal';
import { TGameStatus } from '../Navbar/Navbar';
import styles from './EndgameModal.module.scss';
import EndgameModalResults from './EndgameModalResults/EndgameModalResults';

const GAME_WON_MESSAGE =
  "Congratulation! You've won the game. Checkout the results to see your progress.";
const GAME_LOST_MESSAGE =
  "What a bummer! You've lost the game. Try again, maybe you'll have better luck next time!";

interface IEndgameModal {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  gameStatus: TGameStatus;
  gameDurationTimestamp: number;
  gameRestart: () => void;
}

const EndgameModal = ({
  isVisible,
  setIsVisible,
  gameStatus,
  gameDurationTimestamp,
  gameRestart,
}: IEndgameModal) => {
  const { isDarkThemeUsed } = useTheme();

  return (
    <Modal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      heading={gameStatus === 'won' ? <b>Game won! 🎉</b> : <b>Game lost 😥</b>}
      variant={isDarkThemeUsed ? 'dark' : 'light'}
    >
      <p>{gameStatus === 'won' ? GAME_WON_MESSAGE : GAME_LOST_MESSAGE}</p>
      <EndgameModalResults gameDurationTimestamp={gameDurationTimestamp} />
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
            gameRestart();
          }}
        >
          Play again
        </Button>
      </div>
    </Modal>
  );
};

export default EndgameModal;
