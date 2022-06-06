import classNames from 'classnames';
import { ReactComponent as MoonIcon } from '../../../assets/icons/moon.svg';
import { ReactComponent as SunIcon } from '../../../assets/icons/sun.svg';
import useTheme from '../../../hooks/useTheme';
import styles from './ThemeToggler.module.scss';

interface IThemeToggler {
  style?: React.CSSProperties;
  className?: string;
  variant?: 'light' | 'dark' | 'inverse';
}

const ThemeToggler = ({
  className,
  style,
  variant = 'light',
}: IThemeToggler) => {
  const { isDarkThemeUsed, toggleDarkTheme } = useTheme();

  const buttonClassName = classNames({
    [styles['theme-toggler']]: true,
    [styles['theme-toggler--toggled']]: isDarkThemeUsed,
    [styles['theme-toggler--dark']]:
      variant === 'inverse'
        ? isDarkThemeUsed
          ? true
          : false
        : variant === 'dark',
    [className!]: true,
  });

  const sunIconClassName = classNames({
    [styles['theme-toggler__icon-container__icon']]: true,
    [styles['theme-toggler__icon-container__icon--sun']]: true,
  });

  const moonIconClassName = classNames({
    [styles['theme-toggler__icon-container__icon']]: true,
    [styles['theme-toggler__icon-container__icon--moon']]: true,
  });

  return (
    <button
      className={buttonClassName}
      style={style}
      onClick={() => toggleDarkTheme()}
      data-testid='theme-toggler'
    >
      <span className={styles['theme-toggler__icon-container']}>
        <SunIcon className={sunIconClassName} />
        <MoonIcon className={moonIconClassName} />
        <span
          className={styles['theme-toggler__icon-container__switch']}
        ></span>
      </span>
    </button>
  );
};

export default ThemeToggler;
