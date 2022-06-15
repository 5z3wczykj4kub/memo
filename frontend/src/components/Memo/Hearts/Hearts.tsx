import { Dispatch, SetStateAction } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import useTheme from '../../../hooks/useTheme';
import { restart, selectHearts, shuffle } from '../../../rtk/memoSlice';
import Button from '../../General/Button/Button';
import { TGameStatus } from '../Navbar/Navbar';
import Heart from './Heart/Heart';
import styles from './Hearts.module.scss';

interface IHearts {
  gameStatus: TGameStatus;
  setGameStatus: Dispatch<SetStateAction<TGameStatus>>;
  setIsGameOverModalVisible: Dispatch<SetStateAction<boolean>>;
}

const Hearts = ({
  gameStatus,
  setGameStatus,
  setIsGameOverModalVisible,
}: IHearts) => {
  const hearts = useAppSelector(selectHearts);

  const dispatch = useAppDispatch();

  const onHeartTransitionExitedHandler = () => {
    if (hearts === 1) {
      setIsGameOverModalVisible(true);
      setGameStatus('lost');
    }
  };

  const { isDarkThemeUsed } = useTheme();

  return (
    <>
      {gameStatus ? (
        <Button
          className={styles['play-again-button']}
          variant={isDarkThemeUsed ? 'dark' : 'light'}
          onClick={() => {
            setGameStatus(null);
            dispatch(restart());
            setTimeout(() => dispatch(shuffle()), 400);
          }}
        >
          Play again
        </Button>
      ) : (
        <div className={styles.hearts}>
          <TransitionGroup component={null}>
            {Array.from(Array(hearts)).map((_, index) => (
              <CSSTransition
                key={index}
                timeout={800}
                classNames={{ ...styles }}
                onExited={onHeartTransitionExitedHandler}
              >
                <Heart />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      )}
    </>
  );
};

export default Hearts;
