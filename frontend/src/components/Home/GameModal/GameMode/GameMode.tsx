import { useState } from 'react';
import styles from '../GameModal.module.scss';
import GameModeOption from './GameModeOption/GameModeOption';

const GameMode = () => {
  const [gameMode, setGameMode] = useState<'single' | 'multi'>('single');

  return (
    <div className={styles['game-modal__mode']}>
      <GameModeOption
        mode='single'
        active={gameMode === 'single'}
        onClick={() => setGameMode('single')}
      />
      <GameModeOption
        mode='multi'
        active={gameMode === 'multi'}
        onClick={() => setGameMode('multi')}
      />
    </div>
  );
};

export default GameMode;
