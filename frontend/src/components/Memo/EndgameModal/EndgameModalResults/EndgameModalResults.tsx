import classNames from 'classnames';
import useAppSelector from '../../../../hooks/useAppSelector';
import useTheme from '../../../../hooks/useTheme';
import { selectCards, selectPoints } from '../../../../rtk/memoSlice';
import styles from './EndgameModalResults.module.scss';

interface IEndgameModalResults {
  gameDurationTimestamp: number;
}

const EndgameModalResults = ({
  gameDurationTimestamp,
}: IEndgameModalResults) => {
  const points = useAppSelector(selectPoints);
  const cardsLength = useAppSelector(selectCards).length;

  const { isDarkThemeUsed } = useTheme();

  return (
    <div
      className={classNames({
        [styles['modal-results']]: true,
        [styles['modal-results--dark']]: isDarkThemeUsed,
      })}
    >
      <p className={styles['modal-results__summary']}>
        <b>Game summary</b>
      </p>
      <p className={styles['modal-results__result']}>
        Time: {Math.floor(gameDurationTimestamp / 1000)}s
      </p>
      <p className={styles['modal-results__result']}>
        Score: {points} / {(cardsLength * 100) / 2}
      </p>
    </div>
  );
};

export default EndgameModalResults;
