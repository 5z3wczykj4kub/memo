import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import moment from 'moment';
import { ReactComponent as TrophyIcon } from '../../../assets/icons/trophy.svg';
import useTheme from '../../../hooks/useTheme';
import {
  IGamesPlayedPerDifficultyLevel,
  IUserProfile,
} from '../../../rtk/types';
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
      <div>
        Time played:{' '}
        {timePlayed === 0
          ? '0s'
          : moment
              .duration(timePlayed, 'seconds')
              .toISOString()
              .replace('PT', '')
              .replace('H', 'h ')
              .replace('M', 'min ')
              .replace('S', 's ')}
      </div>
      <div className={styles['profile__tab-panels__panel__heading']}>
        Games statistics
      </div>
      <div
        className={styles['profile__tab-panels__panel__game-statistics-table']}
      >
        <div
          className={classNames({
            [styles['profile__tab-panels__panel__game-statistics-table__part']]:
              true,
            [styles[
              'profile__tab-panels__panel__game-statistics-table__part--dark'
            ]]: isDarkThemeUsed,
          })}
        >
          <div
            className={classNames({
              [styles[
                'profile__tab-panels__panel__game-statistics-table__part__column'
              ]]: true,
              [styles[
                'profile__tab-panels__panel__game-statistics-table__part__column--dark'
              ]]: isDarkThemeUsed,
            })}
          >
            Games lost
          </div>
          <div
            className={
              styles[
                'profile__tab-panels__panel__game-statistics-table__part__row'
              ]
            }
          >
            {Object.keys(gamesLost).map((gameLost) => (
              <div
                key={gameLost}
                className={
                  styles[
                    'profile__tab-panels__panel__game-statistics-table__part__row--indented'
                  ]
                }
              >
                {gameLost}:{' '}
                {gamesLost[gameLost as keyof IGamesPlayedPerDifficultyLevel]}
              </div>
            ))}
          </div>
        </div>
        <div
          className={classNames({
            [styles['profile__tab-panels__panel__game-statistics-table__part']]:
              true,
            [styles[
              'profile__tab-panels__panel__game-statistics-table__part--dark'
            ]]: isDarkThemeUsed,
          })}
        >
          <div
            className={classNames({
              [styles[
                'profile__tab-panels__panel__game-statistics-table__part__column'
              ]]: true,
              [styles[
                'profile__tab-panels__panel__game-statistics-table__part__column--dark'
              ]]: isDarkThemeUsed,
            })}
          >
            Games won
          </div>
          <div
            className={
              styles[
                'profile__tab-panels__panel__game-statistics-table__part__row'
              ]
            }
          >
            {Object.keys(gamesWon).map((gameWon) => (
              <div
                key={gameWon}
                className={
                  styles[
                    'profile__tab-panels__panel__game-statistics-table__part__row--indented'
                  ]
                }
              >
                {gameWon}:{' '}
                {gamesWon[gameWon as keyof IGamesPlayedPerDifficultyLevel]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Tab.Panel>
  );
};

export default ProfileTabPanel;
