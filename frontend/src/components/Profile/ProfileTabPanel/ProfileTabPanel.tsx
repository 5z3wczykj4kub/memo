import { Tab } from '@headlessui/react';
import { IGamesPlayedPerDifficultyLevel } from '../../../rtk/types';
import classNames from 'classnames';
import { ReactComponent as TrophyIcon } from '../../../assets/icons/trophy.svg';
import useTheme from '../../../hooks/useTheme';
import { IUserProfile } from '../../../rtk/types';
import calculateLevel from '../../../utils/functions/calculateLevel';
import styles from '../../../views/Profile/Profile.module.scss';

const ProfileTabPanel = ({
  username,
  experience,
  timePlayed,
  gamesLost,
  gamesWon,
}: IUserProfile) => {
  const { isDarkThemeUsed } = useTheme();

  const { currentLevel, currentLevelExperience, currentLevelProgress } =
    calculateLevel(experience!);

  /**
   * TODO:
   * - Restyle.
   * - Format time played.
   * - Split into smaller components.
   */
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
        User statistics
      </div>
      <div>Username: {username}</div>
      <div>Experience: {experience}</div>
      <div>Time played: {timePlayed}s</div>
      <div className={styles['profile__tab-panels__panel__heading']}>
        Games statistics
      </div>
      <div>Games lost:</div>
      {Object.keys(gamesLost).map((gameLost) => (
        <div
          key={gameLost}
          className={styles['profile__tab-panels__panel__indented']}
        >
          {gameLost}:{' '}
          {gamesLost[gameLost as keyof IGamesPlayedPerDifficultyLevel]}
        </div>
      ))}
      <div>Games won:</div>
      {Object.keys(gamesWon).map((gameWon) => (
        <div
          key={gameWon}
          className={styles['profile__tab-panels__panel__indented']}
        >
          {gameWon}: {gamesWon[gameWon as keyof IGamesPlayedPerDifficultyLevel]}
        </div>
      ))}
    </Tab.Panel>
  );
};

export default ProfileTabPanel;
