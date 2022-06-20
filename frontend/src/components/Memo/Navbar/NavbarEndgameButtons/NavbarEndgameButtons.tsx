import { Dispatch, SetStateAction } from 'react';
import useTheme from '../../../../hooks/useTheme';
import Button from '../../../General/Button/Button';
import styles from './NavbarEndgameButtons.module.scss';

interface INavbarEndgameButtons {
  setIsEndgameModalVisible: Dispatch<SetStateAction<boolean>>;
  onGameRestart: () => void;
}

const NavbarEndgameButtons = ({
  setIsEndgameModalVisible,
  onGameRestart,
}: INavbarEndgameButtons) => {
  const { isDarkThemeUsed } = useTheme();

  return (
    <>
      <Button
        className={styles['navbar-button']}
        variant={isDarkThemeUsed ? 'dark' : 'light'}
        onClick={() => setIsEndgameModalVisible(true)}
      >
        Results
      </Button>
      <Button
        className={styles['navbar-button']}
        variant={isDarkThemeUsed ? 'dark' : 'light'}
        onClick={() => onGameRestart()}
      >
        Play again
      </Button>
    </>
  );
};

export default NavbarEndgameButtons;
