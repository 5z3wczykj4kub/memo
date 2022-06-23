import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { ReactComponent as TrophyIcon } from '../../../assets/icons/trophy.svg';
import useAppSelector from '../../../hooks/useAppSelector';
import useTheme from '../../../hooks/useTheme';
import { selectCurrentUser } from '../../../rtk/authSlice';
import styles from '../../../views/Profile/Profile.module.scss';

const ProfileTabPanel = () => {
  const { isDarkThemeUsed } = useTheme();

  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <Tab.Panel
      className={classNames({
        [styles['profile__tab-panels__panel']]: true,
        [styles['profile__tab-panels__panel--dark']]: isDarkThemeUsed,
      })}
    >
      <div className={styles['profile__tab-panels__panel__heading']}>
        Level {Math.floor(currentUser.experience! / 6000)}
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
                width: `${((currentUser.experience! % 6000) / 6000) * 100}%`,
              }}
            ></div>
          </div>
          <div
            className={styles['profile__tab-panels__panel__progress__bar__exp']}
          >
            <div>{currentUser.experience! % 6000} EXP</div>
            <div>6000 EXP</div>
          </div>
        </div>
      </div>
      <div className={styles['profile__tab-panels__panel__heading']}>
        Statistics
      </div>
      <div>Username: {currentUser.username}</div>
      <div>Experience: {currentUser.experience}</div>
      <div>Time played: 0s</div>
    </Tab.Panel>
  );
};

export default ProfileTabPanel;
