import styles from './Hearts.module.scss';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectHearts } from '../../../rtk/memoSlice';
import Heart from './Heart/Heart';

const Hearts = () => {
  const hearts = useAppSelector(selectHearts);

  return (
    <div className={styles.hearts}>
      {Array.from(Array(hearts)).map((_, index) => (
        <Heart key={index} />
      ))}
    </div>
  );
};

export default Hearts;
