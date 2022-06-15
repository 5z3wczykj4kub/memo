import { useState } from 'react';
import { useModal } from '../../General/Modal/Modal';
import Hearts from '../Hearts/Hearts';
import Points from '../Points/Points';
import GameOverModal from '../ResultsModal/GameOverModal';
import styles from './Navbar.module.scss';

export type TGameStatus = 'won' | 'lost' | null;

const Navbar = () => {
  const [gameStatus, setGameStatus] = useState<TGameStatus>(null);
  const [isGameOverModalVisible, setIsGameOverModalVisible] = useModal();

  return (
    <nav className={styles.navbar}>
      <Points
        setGameStatus={setGameStatus}
        setIsGameOverModalVisible={setIsGameOverModalVisible}
      />
      <Hearts
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        setIsGameOverModalVisible={setIsGameOverModalVisible}
      />
      <GameOverModal
        isVisible={isGameOverModalVisible}
        setIsVisible={setIsGameOverModalVisible}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
      />
    </nav>
  );
};

export default Navbar;
