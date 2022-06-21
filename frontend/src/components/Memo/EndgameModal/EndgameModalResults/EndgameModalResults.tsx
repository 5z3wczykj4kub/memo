import classNames from 'classnames';
import { Icons } from 'react-toastify';
import useAppSelector from '../../../../hooks/useAppSelector';
import useTheme from '../../../../hooks/useTheme';
import { selectCurrentUserExperience } from '../../../../rtk/authSlice';
import { selectCards, selectPoints } from '../../../../rtk/memoSlice';
import { ICurrentUserGameResults } from '../../../../rtk/types';
import styles from './EndgameModalResults.module.scss';

interface IEndgameModalResults {
  gameDurationTimestamp: number;
  gameResultsData?: ICurrentUserGameResults;
  isSendingGameResults?: boolean;
  hasSendingGameResultsSucceeded?: boolean;
  hasSendingGameResultsFailed?: boolean;
}

const EndgameModalResults = ({
  gameDurationTimestamp,
  gameResultsData,
  isSendingGameResults,
  hasSendingGameResultsSucceeded,
  hasSendingGameResultsFailed,
}: IEndgameModalResults) => {
  const points = useAppSelector(selectPoints);
  const cardsLength = useAppSelector(selectCards).length;
  const currentUserExperience = useAppSelector(selectCurrentUserExperience);

  const { isDarkThemeUsed } = useTheme();

  const { spinner: Spinner } = Icons;

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
        Score: {points}/{(cardsLength * 100) / 2}
      </p>
      {isSendingGameResults ? (
        <p
          className={classNames({
            [styles['modal-results__result']]: true,
            [styles['modal-results__result--loading']]: true,
          })}
        >
          <Spinner /> Fetching user data...
        </p>
      ) : hasSendingGameResultsSucceeded ? (
        <p className={styles['modal-results__result']}>
          Experience: {gameResultsData?.experience}{' '}
          <span className={styles['modal-results__result__earned-experience']}>
            +{gameResultsData?.earnedExperience}
          </span>
        </p>
      ) : hasSendingGameResultsFailed ? (
        <p className={styles['modal-results__result']}>
          Experience:{' '}
          <span className={styles['modal-results__result--error']}>
            Something went wrong. Fetching user data failed.
          </span>
        </p>
      ) : currentUserExperience ? (
        <p className={styles['modal-results__result']}>
          Experience: {currentUserExperience}{' '}
          <span className={styles['modal-results__result__earned-experience']}>
            +0
          </span>
        </p>
      ) : null}
    </div>
  );
};

export default EndgameModalResults;
