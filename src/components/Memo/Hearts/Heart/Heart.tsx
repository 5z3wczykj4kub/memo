import { ReactComponent as HeartIcon } from '../../../../assets/icons/heart.svg';
import styles from './Heart.module.scss';

const Heart = () => (
  <HeartIcon className={styles['heart-icon']} data-testid='heart' />
);

export default Heart;
