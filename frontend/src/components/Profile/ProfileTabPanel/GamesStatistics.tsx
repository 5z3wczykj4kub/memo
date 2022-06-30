import { IUserProfile } from '../../../rtk/types';
import styles from '../../../views/Profile/Profile.module.scss';
import GamesStatisticsList from './GamesStatisticsList';

interface IGamesStatistics
  extends Pick<IUserProfile, 'gamesLost' | 'gamesWon'> {}

const GamesStatistics = ({ gamesLost, gamesWon }: IGamesStatistics) => (
  <>
    <div className={styles['profile__tab-panels__panel__heading']}>
      Games statistics
    </div>
    <div
      className={styles['profile__tab-panels__panel__game-statistics-table']}
    >
      <GamesStatisticsList label='Games lost' games={gamesLost} />
      <GamesStatisticsList label='Games won' games={gamesWon} />
    </div>
  </>
);

export default GamesStatistics;
