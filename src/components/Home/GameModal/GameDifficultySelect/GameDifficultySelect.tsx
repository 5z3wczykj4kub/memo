import classNames from 'classnames';
import { useSelect, UseSelectStateChange } from 'downshift';
import { ReactComponent as ChevronIcon } from '../../../../assets/icons/chevron.svg';
import useTheme from '../../../../hooks/useTheme';
import { TDifficultyLevel } from '../../../../rtk/types';
import styles from './GameDifficultySelect.module.scss';

const GameDifficultySelect = () => {
  const difficulties: TDifficultyLevel[] = [
    'easy',
    'medium',
    'hard',
    'extreme',
  ];

  const onSelectedItemChangeHandler = ({
    selectedItem,
  }: UseSelectStateChange<string>) =>
    localStorage.setItem('difficultyLevel', selectedItem!);

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: difficulties,
    defaultSelectedItem: localStorage.getItem('difficultyLevel') || 'medium',
    onSelectedItemChange: onSelectedItemChangeHandler,
  });

  const { isDarkThemeUsed } = useTheme();

  const buttonClassName = classNames({
    [styles['game-difficulty-select__button']]: true,
    [styles['game-difficulty-select__button--dark']]: isDarkThemeUsed,
    [styles['game-difficulty-select__button--active']]: isOpen,
  });

  const menuClassName = classNames({
    [styles['game-difficulty-select__menu']]: true,
    [styles['game-difficulty-select__menu--dark']]: isDarkThemeUsed,
    [styles['game-difficulty-select__menu--active']]: isOpen,
  });

  const getOptionClassName = (isHighlighted: boolean) =>
    classNames({
      [styles['game-difficulty-select__menu__option']]: true,
      [styles['game-difficulty-select__menu__option--dark']]: isDarkThemeUsed,
      [styles['game-difficulty-select__menu__option--highlighted']]:
        isHighlighted,
    });

  return (
    <div className={styles['game-difficulty-select']}>
      <label
        className={styles['game-difficulty-select__label']}
        {...getLabelProps()}
      >
        2. Select game difficulty
      </label>
      <button className={buttonClassName} {...getToggleButtonProps()}>
        {selectedItem}
        <ChevronIcon />
      </button>
      <ul className={menuClassName} {...getMenuProps()}>
        {isOpen &&
          difficulties.map((difficulty, index) => (
            <li
              key={`${difficulty}${index}`}
              className={getOptionClassName(highlightedIndex === index)}
              {...getItemProps({
                item: difficulty,
                index,
              })}
            >
              {difficulty}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GameDifficultySelect;
