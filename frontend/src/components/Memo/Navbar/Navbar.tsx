import { useState } from 'react';
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

  return (
    <nav className={styles.navbar}>
      <Points
        setGameStatus={setGameStatus}
        setIsEndgameModalVisible={setIsEndgameModalVisible}
      />
      {gameStatus && (
        <NavbarEndgameButtons
          setGameStatus={setGameStatus}
          setIsEndgameModalVisible={setIsEndgameModalVisible}
        />
      )}
      <Hearts
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        setIsEndgameModalVisible={setIsEndgameModalVisible}
      />
      <EndgameModal
        isVisible={isEndgameModalVisible}
        setIsVisible={setIsEndgameModalVisible}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
      />
    </nav>
  );
};

export default Navbar;
