import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectHearts } from '../../../rtk/memoSlice';
import Heart from './Heart/Heart';
import styles from './Hearts.module.scss';

const Hearts = () => {
  const hearts = useAppSelector(selectHearts);

  return (
    <div className={styles.hearts}>
      <TransitionGroup component={null}>
        {Array.from(Array(hearts)).map((_, index) => (
          <CSSTransition key={index} timeout={800} classNames={{ ...styles }}>
            <Heart />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Hearts;
