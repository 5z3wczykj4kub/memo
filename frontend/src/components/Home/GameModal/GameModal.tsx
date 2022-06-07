import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import useTheme from '../../../hooks/useTheme';
import Button from '../../General/Button/Button';
import Modal from '../../General/Modal/Modal';
import GameDifficultySelect from './GameDifficultySelect/GameDifficultySelect';
import styles from './GameModal.module.scss';
import GameMode from './GameMode/GameMode';

interface IGameModal {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const GameModal = ({ isModalVisible, setIsModalVisible }: IGameModal) => {
  const { isDarkThemeUsed } = useTheme();

  const navigate = useNavigate();

  return (
    <Modal
      isVisible={isModalVisible}
      setIsVisible={setIsModalVisible}
      heading={<b>Choose game mode and difficulty</b>}
      variant={isDarkThemeUsed ? 'dark' : 'light'}
    >
      <div className={styles['game-modal']}>
        <p className={styles['game-modal__step']}>1. Select game mode</p>
        <GameMode />
        <GameDifficultySelect />
        <div className={styles['game-modal__footer']}>
          <Button
            className={styles['game-modal__footer__button']}
            variant={isDarkThemeUsed ? 'dark' : 'light'}
            onClick={() => navigate('/game')}
          >
            Play game
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GameModal;
