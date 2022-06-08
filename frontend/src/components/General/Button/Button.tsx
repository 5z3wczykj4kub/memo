import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties;
  className?: string;
  children?: ReactNode;
  tabIndex?: number;
  variant?: 'light' | 'dark';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: IButton) => {
  const { className, children, variant = 'light' } = props;

  return (
    <button
      {...props}
      className={classNames({
        [styles.button]: true,
        [styles['button--dark']]: variant === 'dark',
        [className!]: true,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
