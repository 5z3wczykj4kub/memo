import { useState } from 'react';
import { toast } from 'react-toastify';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { useUpdateUserExperienceMutation } from '../../../rtk/api';
import { selectCurrentUser, setCurrentUser } from '../../../rtk/authSlice';
import {
  restart,
  selectDifficultyLevel,
  selectPoints,
  shuffle,
} from '../../../rtk/memoSlice';
import { IResponseCatchError } from '../../../rtk/types';
import calculateLevel from '../../../utils/functions/calculateLevel';
import { useModal } from '../../General/Modal/Modal';
import EndgameModal from '../EndgameModal/EndgameModal';
import Hearts from '../Hearts/Hearts';
import LevelUpToast from '../LevelUpToast/LevelUpToast';
import Points from '../Points/Points';
import styles from './Navbar.module.scss';
import NavbarEndgameButtons from './NavbarEndgameButtons/NavbarEndgameButtons';

export type TGameStatus = 'won' | 'lost' | null;

/**
 * TODO:
 * - Send results data even on game loss.
 * - Send more results data i.e. games lost, games won etc.
 * - Make profile page a private route.
 * - Refactor endpoint to use PUT instead of POST.
 * - Add 404 page.
 * - Underline back to home link on hover.
 * - Test.
 */
const GAME_RESULTS_TOAST_MESSAGE = {
  PENDING: 'Sending game results...',
  SUCCESS: (earnedExperience: number) => `${earnedExperience} EXP`,
  ERROR: 'Unable to send game results',
};

const Navbar = () => {
  const points = useAppSelector(selectPoints);
  const currentUser = useAppSelector(selectCurrentUser);
  const difficultyLevel = useAppSelector(selectDifficultyLevel);

  const [gameStatus, setGameStatus] = useState<TGameStatus>(null);
  const [isEndgameModalVisible, setIsEndgameModalVisible] = useModal();
  const [gameDurationTimestamp, setGameDurationTimestamp] = useState(
    Date.now()
  );

  const dispatch = useAppDispatch();

  const [
    updateUserExperience,
    {
      data: gameResultsData,
      isLoading: isSendingGameResults,
      isSuccess: hasSendingGameResultsSucceeded,
      isError: hasSendingGameResultsFailed,
      reset: resetGameResultsData,
    },
  ] = useUpdateUserExperienceMutation();

  const onGameRestartHandler = () => {
    setGameStatus(null);
    setGameDurationTimestamp(Date.now());
    dispatch(restart());
    setTimeout(() => dispatch(shuffle()), 400);
    resetGameResultsData();
  };

  const onGameLoseHandler = () => {
    setIsEndgameModalVisible(true);
    setGameStatus('lost');
    setGameDurationTimestamp(
      (prevGameDuration) => Date.now() - prevGameDuration
    );
  };

  const onGameWinHandler = async () => {
    setIsEndgameModalVisible(true);
    setGameStatus('won');
    setGameDurationTimestamp(
      (prevGameDuration) => Date.now() - prevGameDuration
    );
    if (!currentUser?.id) return;

    const gameResultsPayload = {
      time: Math.floor(gameDurationTimestamp / 1000),
      points,
      difficultyLevel,
    };

    try {
      const currentUserData = await toast.promise(
        updateUserExperience(gameResultsPayload).unwrap(),
        {
          pending: GAME_RESULTS_TOAST_MESSAGE.PENDING,
          success: {
            render: ({ data }) =>
              GAME_RESULTS_TOAST_MESSAGE.SUCCESS(data!.earnedExperience),
          },
          error: GAME_RESULTS_TOAST_MESSAGE.ERROR,
        }
      );

      const { currentLevel, hasLeveledUp } = calculateLevel(
        currentUserData.experience!,
        currentUserData.earnedExperience
      );

      if (hasLeveledUp) toast(<LevelUpToast level={currentLevel} />);

      dispatch(setCurrentUser(currentUserData));
    } catch (error) {
      (error as IResponseCatchError).data.errors.forEach(({ message }) =>
        toast.error(message, { toastId: message })
      );
    }
  };

  return (
    <nav className={styles.navbar}>
      <Points onGameWin={onGameWinHandler} />
      {gameStatus ? (
        <NavbarEndgameButtons
          setIsEndgameModalVisible={setIsEndgameModalVisible}
          onGameRestart={onGameRestartHandler}
        />
      ) : (
        <Hearts onGameLose={onGameLoseHandler} />
      )}
      <EndgameModal
        isVisible={isEndgameModalVisible}
        setIsVisible={setIsEndgameModalVisible}
        gameStatus={gameStatus}
        gameDurationTimestamp={gameDurationTimestamp}
        onGameRestart={onGameRestartHandler}
        gameResultsData={gameResultsData}
        isSendingGameResults={isSendingGameResults}
        hasSendingGameResultsSucceeded={hasSendingGameResultsSucceeded}
        hasSendingGameResultsFailed={hasSendingGameResultsFailed}
      />
    </nav>
  );
};

export default Navbar;
