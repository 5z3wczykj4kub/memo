import { useEffect, useState } from 'react';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { restart, shuffle } from '../../../rtk/memoSlice';
import { useModal } from '../../General/Modal/Modal';
import EndgameModal from '../EndgameModal/EndgameModal';
import Hearts from '../Hearts/Hearts';
import Points from '../Points/Points';
import styles from './Navbar.module.scss';
import NavbarEndgameButtons from './NavbarEndgameButtons/NavbarEndgameButtons';

export type TGameStatus = 'won' | 'lost' | null;

const Navbar = () => {
  const [gameStatus, setGameStatus] = useState<TGameStatus>(null);
  const [isEndgameModalVisible, setIsEndgameModalVisible] = useModal();
  const [gameDurationTimestamp, setGameDurationTimestamp] = useState(
    Date.now()
  );

  const dispatch = useAppDispatch();

  const gameRestart = () => {
    setGameStatus(null);
    setGameDurationTimestamp(Date.now());
    dispatch(restart());
    setTimeout(() => dispatch(shuffle()), 400);
  };

  useEffect(() => {
    if (!gameStatus) return;
    setGameDurationTimestamp(
      (prevGameDuration) => Date.now() - prevGameDuration
    );
  }, [gameStatus]);

  return (
    <nav className={styles.navbar}>
      <Points
        setGameStatus={setGameStatus}
        setIsEndgameModalVisible={setIsEndgameModalVisible}
      />
      {gameStatus ? (
        <NavbarEndgameButtons
          setIsEndgameModalVisible={setIsEndgameModalVisible}
          gameRestart={gameRestart}
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
        gameRestart={gameRestart}
      />
    </nav>
  );
};

export default Navbar;
