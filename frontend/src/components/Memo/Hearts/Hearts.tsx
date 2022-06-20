import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectHearts } from '../../../rtk/memoSlice';
import Heart from './Heart/Heart';
import styles from './Hearts.module.scss';

interface IHearts {
  onGameLose: () => void;
}

const Hearts = ({ onGameLose }: IHearts) => {
  const hearts = useAppSelector(selectHearts);

  const onHeartTransitionExitedHandler = () => {
    if (hearts === 1) {
      onGameLose();
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
