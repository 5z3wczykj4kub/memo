import classNames from 'classnames';
import { ReactComponent as GameControllerIcon } from '../../../../../assets/icons/game-controller.svg';
import useTheme from '../../../../../hooks/useTheme';
import styles from '../../GameModal.module.scss';

interface IGameModeOption {
  mode: 'single' | 'multi';
  active: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const GameModeOption = ({ mode, active, onClick }: IGameModeOption) => {
  const { isDarkThemeUsed } = useTheme();

  const gameModeClassName = classNames({
    [styles['game-modal__mode__option']]: true,
    [styles['game-modal__mode__option--dark']]: isDarkThemeUsed,
    [styles['game-modal__mode__option--active']]: active,
  });

  const gameControllerClassName = classNames({
    [styles['game-modal__mode__option__controller-icon']]: true,
    [styles['game-modal__mode__option__controller-icon--dark']]:
      isDarkThemeUsed,
  });

  return (
    <div className={gameModeClassName} onClick={onClick}>
      {mode.toUpperCase()}
      <GameControllerIcon className={gameControllerClassName} />
      {mode === 'multi' && (
        <GameControllerIcon className={gameControllerClassName} />
      )}
    </div>
  );
};

export default GameModeOption;
