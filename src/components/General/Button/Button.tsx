import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

interface IButton {
  style?: React.CSSProperties;
  className?: string;
  children?: ReactNode;
  tabIndex?: number;
  variant?: 'light' | 'dark';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  style,
  className,
  children,
  tabIndex,
  variant = 'light',
  onClick,
}: IButton) => (
  <button
    className={classNames({
      [styles.button]: true,
      [styles['button--dark']]: variant === 'dark',
      [className!]: true,
    })}
    style={style}
    tabIndex={tabIndex}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
