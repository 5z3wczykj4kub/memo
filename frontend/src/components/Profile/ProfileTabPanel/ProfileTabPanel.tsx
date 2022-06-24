import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { ReactComponent as TrophyIcon } from '../../../assets/icons/trophy.svg';
import useAppSelector from '../../../hooks/useAppSelector';
import useTheme from '../../../hooks/useTheme';
import { selectCurrentUser } from '../../../rtk/authSlice';
import calculateLevel from '../../../utils/functions/calculateLevel';
import styles from '../../../views/Profile/Profile.module.scss';

const ProfileTabPanel = () => {
  const { isDarkThemeUsed } = useTheme();

  const { username, experience, timePlayed } =
    useAppSelector(selectCurrentUser);

  const { currentLevel, currentLevelExperience, currentLevelProgress } =
    calculateLevel(experience!);

  return (
    <Tab.Panel
      className={classNames({
        [styles['profile__tab-panels__panel']]: true,
        [styles['profile__tab-panels__panel--dark']]: isDarkThemeUsed,
      })}
    >
      <div className={styles['profile__tab-panels__panel__heading']}>
        Level {currentLevel}
      </div>
      <div className={styles['profile__tab-panels__panel__progress']}>
        <TrophyIcon
          className={styles['profile__tab-panels__panel__progress__trophy']}
        />
        <div className={styles['profile__tab-panels__panel__progress__bar']}>
          <div
            className={
              styles['profile__tab-panels__panel__progress__bar__line']
            }
          >
            <div
              className={
                styles[
                  'profile__tab-panels__panel__progress__bar__line__percent'
                ]
              }
              style={{
                width: currentLevelProgress,
              }}
            ></div>
          </div>
          <div
            className={styles['profile__tab-panels__panel__progress__bar__exp']}
          >
            <div>{currentLevelExperience} EXP</div>
            <div>6000 EXP</div>
          </div>
        </div>
      </div>
      <div className={styles['profile__tab-panels__panel__heading']}>
        Statistics
      </div>
      <div>Username: {username}</div>
      <div>Experience: {experience}</div>
      <div>Time played: {timePlayed}s</div>
    </Tab.Panel>
  );
};

export default ProfileTabPanel;
