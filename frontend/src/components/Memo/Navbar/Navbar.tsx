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
import { useModal } from '../../General/Modal/Modal';
import EndgameModal from '../EndgameModal/EndgameModal';
import Hearts from '../Hearts/Hearts';
import Points from '../Points/Points';
import styles from './Navbar.module.scss';
import NavbarEndgameButtons from './NavbarEndgameButtons/NavbarEndgameButtons';

export type TGameStatus = 'won' | 'lost' | null;

const GAME_RESULTS_TOAST_MESSAGE = {
  PENDING: 'Sending game results...',
  SUCCESS: (earnedExperience: number) => `Earned ${earnedExperience} exp`,
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

  const gameRestartHandler = () => {
    setGameStatus(null);
    setGameDurationTimestamp(Date.now());
    dispatch(restart());
    setTimeout(() => dispatch(shuffle()), 400);
    resetGameResultsData();
  };

  const gameLoseHandler = () => {
    setIsEndgameModalVisible(true);
    setGameStatus('lost');
    setGameDurationTimestamp(
      (prevGameDuration) => Date.now() - prevGameDuration
    );
  };

  const gameWinHandler = async () => {
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
      dispatch(setCurrentUser(currentUserData));
    } catch (error) {
      (error as IResponseCatchError).data.errors.forEach(({ message }) =>
        toast.error(message, { toastId: message })
      );
    }
  };

  return (
    <nav className={styles.navbar}>
      <Points onGameWin={gameWinHandler} />
      {gameStatus ? (
        <NavbarEndgameButtons
          setIsEndgameModalVisible={setIsEndgameModalVisible}
          onGameRestart={gameRestartHandler}
        />
      ) : (
        <Hearts onGameLose={gameLoseHandler} />
      )}
      <EndgameModal
        isVisible={isEndgameModalVisible}
        setIsVisible={setIsEndgameModalVisible}
        gameStatus={gameStatus}
        gameDurationTimestamp={gameDurationTimestamp}
        onGameRestart={gameRestartHandler}
        gameResultsData={gameResultsData}
        isSendingGameResults={isSendingGameResults}
        hasSendingGameResultsSucceeded={hasSendingGameResultsSucceeded}
        hasSendingGameResultsFailed={hasSendingGameResultsFailed}
      />
    </nav>
  );
};

export default Navbar;
