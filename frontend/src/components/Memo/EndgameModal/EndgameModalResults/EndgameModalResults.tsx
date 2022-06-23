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
      <div className={styles['modal-results__summary']}>
        <b>Game summary</b>
      </div>
      <div className={styles['modal-results__result']}>
        Time: {Math.floor(gameDurationTimestamp / 1000)}s
      </div>
      <div className={styles['modal-results__result']}>
        Score: {points}/{(cardsLength * 100) / 2}
      </div>
      {isSendingGameResults ? (
        <div
          className={classNames({
            [styles['modal-results__result']]: true,
            [styles['modal-results__result--loading']]: true,
          })}
        >
          <Spinner /> Fetching user data...
        </div>
      ) : hasSendingGameResultsSucceeded ? (
        <div className={styles['modal-results__result']}>
          Experience: {gameResultsData?.experience}{' '}
          <span className={styles['modal-results__result__earned-experience']}>
            +{gameResultsData?.earnedExperience}
          </span>
        </div>
      ) : hasSendingGameResultsFailed ? (
        <div className={styles['modal-results__result--error']}>
          Something went wrong. Fetching user data failed.
        </div>
      ) : currentUserExperience ? (
        <div className={styles['modal-results__result']}>
          Experience: {currentUserExperience}{' '}
          <span className={styles['modal-results__result__earned-experience']}>
            +0
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default EndgameModalResults;
