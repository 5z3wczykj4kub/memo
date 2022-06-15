import { Dispatch, SetStateAction } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectHearts } from '../../../rtk/memoSlice';
import { TGameStatus } from '../Navbar/Navbar';
import Heart from './Heart/Heart';
import styles from './Hearts.module.scss';

interface IHearts {
  gameStatus: TGameStatus;
  setGameStatus: Dispatch<SetStateAction<TGameStatus>>;
  setIsEndgameModalVisible: Dispatch<SetStateAction<boolean>>;
}

const Hearts = ({
  gameStatus,
  setGameStatus,
  setIsEndgameModalVisible,
}: IHearts) => {
  const hearts = useAppSelector(selectHearts);

  const onHeartTransitionExitedHandler = () => {
    if (hearts === 1) {
      setIsEndgameModalVisible(true);
      setGameStatus('lost');
    }
  };

  return (
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
  );
};

export default Hearts;
