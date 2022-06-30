import classNames from 'classnames';
import useTheme from '../../../hooks/useTheme';
import { IGamesPlayedPerDifficultyLevel } from '../../../rtk/types';
import styles from '../../../views/Profile/Profile.module.scss';

interface IGamesStatisticsList {
  label: string;
  games: IGamesPlayedPerDifficultyLevel;
}

const GamesStatisticsList = ({ label, games }: IGamesStatisticsList) => {
  const { isDarkThemeUsed } = useTheme();

  return (
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
        {label}
      </div>
      <div
        className={
          styles['profile__tab-panels__panel__game-statistics-table__part__row']
        }
      >
        {Object.keys(games).map((game) => (
          <div
            key={game}
            className={
              styles[
                'profile__tab-panels__panel__game-statistics-table__part__row--indented'
              ]
            }
          >
            {game}: {games[game as keyof IGamesPlayedPerDifficultyLevel]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesStatisticsList;
