import classNames from 'classnames';
import { useState } from 'react';
import { ReactComponent as MoonIcon } from '../../assets/icons/moon.svg';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import styles from './ThemeToggler.module.scss';

interface IThemeToggler {
  style?: React.CSSProperties;
  className?: string;
  color?: 'light' | 'dark';
  reverse?: boolean;
}

const ThemeToggler = ({
  className,
  style,
  color = 'light',
  reverse = false,
}: IThemeToggler) => {
  const [isToggled, setIsToggled] = useState(false);

  const onClickHandler = () => {
    document.body.classList.toggle('dark-theme');
    setIsToggled((prevIsToggled) => !prevIsToggled);
  };

  const buttonClassName = classNames({
    [styles['theme-toggler']]: true,
    [styles['theme-toggler--toggled']]: isToggled,
    [styles['theme-toggler--dark']]: reverse
      ? isToggled
        ? true
        : false
      : color === 'dark',
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
    <button className={buttonClassName} style={style} onClick={onClickHandler}>
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
