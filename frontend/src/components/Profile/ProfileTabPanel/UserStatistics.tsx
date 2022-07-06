import moment from 'moment';
import { IUserProfile } from '../../../rtk/types';
import styles from '../../../views/Profile/Profile.module.scss';

interface IUserStatistics
  extends Pick<IUserProfile, 'username' | 'experience' | 'timePlayed'> {}

const UserStatistics = ({
  username,
  experience,
  timePlayed,
}: IUserStatistics) => (
  <>
    <div className={styles['profile__tab-panels__panel__heading']}>
      User statistics
    </div>
    <div>Username: {username}</div>
    <div>Experience: {experience}</div>
    <div>
      Time played:{' '}
      {moment
        .duration(timePlayed, 'seconds')
        .toISOString()
        .replace('P', '')
        .replace('T', '')
        .replace('H', 'h ')
        .replace('M', 'min ')
        .replace('S', 's')
        .replace('D', 's')}
    </div>
  </>
);

export default UserStatistics;
