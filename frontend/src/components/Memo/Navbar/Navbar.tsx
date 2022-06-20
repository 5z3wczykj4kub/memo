import { useEffect, useState } from 'react';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectCurrentUser } from '../../../rtk/authSlice';
import {
  restart,
  selectDifficultyLevel,
  selectPoints,
  shuffle,
} from '../../../rtk/memoSlice';
import { useModal } from '../../General/Modal/Modal';
import EndgameModal from '../EndgameModal/EndgameModal';
import Hearts from '../Hearts/Hearts';
import Points from '../Points/Points';
import styles from './Navbar.module.scss';
import NavbarEndgameButtons from './NavbarEndgameButtons/NavbarEndgameButtons';

export type TGameStatus = 'won' | 'lost' | null;

const Navbar = () => {
  const points = useAppSelector(selectPoints);
  const currentUser = useAppSelector(selectCurrentUser);
  const difficultyLevel = useAppSelector(selectDifficultyLevel);

  const [gameStatus, setGameStatus] = useState<TGameStatus>(null);
  const [isEndgameModalVisible, setIsEndgameModalVisible] = useModal();
  const [gameDurationTimestamp, setGameDurationTimestamp] = useState(
    Date.now()
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!gameStatus) return;
    setGameDurationTimestamp(
      (prevGameDuration) => Date.now() - prevGameDuration
    );
  }, [gameStatus]);

  const gameRestartHandler = () => {
    setGameStatus(null);
    setGameDurationTimestamp(Date.now());
    dispatch(restart());
    setTimeout(() => dispatch(shuffle()), 400);
  };

  const gameWinHandler = () => {
    setIsEndgameModalVisible(true);
    setGameStatus('won');
    if (!currentUser?.id) return;
    /**
     * TODO:
     * Send data.
     */
    const payload = {
      time: gameDurationTimestamp / 1000,
      points,
      difficultyLevel,
    };
  };

  return (
    <nav className={styles.navbar}>
      <Points onGameWin={gameWinHandler} />
      {gameStatus ? (
        <NavbarEndgameButtons
          setIsEndgameModalVisible={setIsEndgameModalVisible}
          onGameRestart={gameRestartHandler}
        />
      ) : (
        <Hearts
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          setIsEndgameModalVisible={setIsEndgameModalVisible}
        />
      )}
      <EndgameModal
        isVisible={isEndgameModalVisible}
        setIsVisible={setIsEndgameModalVisible}
        gameStatus={gameStatus}
        gameDurationTimestamp={gameDurationTimestamp}
        onGameRestart={gameRestartHandler}
      />
    </nav>
  );
};

export default Navbar;
