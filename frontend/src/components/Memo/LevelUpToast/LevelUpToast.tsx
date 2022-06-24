import { ReactComponent as TrophyIcon } from '../../../assets/icons/trophy.svg';
import styles from './LevelUpToast.module.scss';

interface ILevelUpToast {
  level: number;
}

const LevelUpToast = ({ level }: ILevelUpToast) => {
  return (
    <div className={styles['level-up-toast']}>
      <TrophyIcon className={styles['level-up-toast__trophy-icon']} />
      <p className={styles['level-up-toast__level-message']}>Level {level}</p>
    </div>
  );
};

export default LevelUpToast;
