import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import useTheme from '../../../hooks/useTheme';
import { IUserProfile } from '../../../rtk/types';
import styles from '../../../views/Profile/Profile.module.scss';
import Experience from './Experience';
import GamesStatistics from './GamesStatistics';
import UserStatistics from './UserStatistics';

const ProfileTabPanel = ({
  username,
  experience,
  timePlayed,
  gamesLost,
  gamesWon,
}: IUserProfile) => {
  const { isDarkThemeUsed } = useTheme();

  return (
    <Tab.Panel
      className={classNames({
        [styles['profile__tab-panels__panel']]: true,
        [styles['profile__tab-panels__panel--dark']]: isDarkThemeUsed,
      })}
    >
      <Experience experience={experience} />
      <UserStatistics
        username={username}
        experience={experience}
        timePlayed={timePlayed}
      />
      <GamesStatistics gamesLost={gamesLost} gamesWon={gamesWon} />
    </Tab.Panel>
  );
};

export default ProfileTabPanel;
