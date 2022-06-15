import { Dispatch, SetStateAction } from 'react';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import useTheme from '../../../../hooks/useTheme';
import { restart, shuffle } from '../../../../rtk/memoSlice';
import Button from '../../../General/Button/Button';
import { TGameStatus } from '../Navbar';
import styles from './NavbarEndgameButtons.module.scss';

interface INavbarEndgameButtons {
  setGameStatus: Dispatch<SetStateAction<TGameStatus>>;
  setIsEndgameModalVisible: Dispatch<SetStateAction<boolean>>;
}

const NavbarEndgameButtons = ({
  setGameStatus,
  setIsEndgameModalVisible,
}: INavbarEndgameButtons) => {
  const { isDarkThemeUsed } = useTheme();

  const dispatch = useAppDispatch();

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
        onClick={() => {
          setGameStatus(null);
          dispatch(restart());
          setTimeout(() => dispatch(shuffle()), 400);
        }}
      >
        Play again
      </Button>
    </>
  );
};

export default NavbarEndgameButtons;
